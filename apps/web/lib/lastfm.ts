const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;

const LASTFM_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

export const getNowPlaying = async () => {
  if (!API_KEY || !USERNAME) return null;

  try {
    const response = await fetch(LASTFM_ENDPOINT, {
      next: { revalidate: 10 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const tracks = data?.recenttracks?.track;
    
    if (!tracks || tracks.length === 0) return null;
    
    const track = tracks[0];
    const isPlaying = track['@attr']?.nowplaying === 'true';
    
    return {
      album: track.album['#text'],
      albumImageUrl: track.image[track.image.length - 1]['#text'],
      artist: track.artist['#text'],
      isPlaying: isPlaying,
      songUrl: track.url,
      title: track.name,
    };
  } catch (error) {
    console.error("Error fetching Last.fm data", error);
    return null;
  }
};
