const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const getAccessToken = async () => {
  if (!client_id || !client_secret || !refresh_token) return null;

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
      next: { revalidate: 3600 },
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching Spotify access token", error);
    return null;
  }
};

export const getNowPlaying = async () => {
  const tokenResponse = await getAccessToken();
  if (!tokenResponse || !tokenResponse.access_token) return null;

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
      next: { revalidate: 30 },
    });

    if (response.status === 204 || response.status > 400) {
      return null;
    }

    const song = await response.json();

    if (song.item === null) {
      return null;
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    };
  } catch (error) {
    console.error("Error fetching currently playing song", error);
    return null;
  }
};
