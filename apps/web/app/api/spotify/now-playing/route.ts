import { NextResponse } from 'next/server';
import { siteConfig } from '../../../../config/site.config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Try Discord Lanyard (Real-time, circumvents Spotify API block, works with Spicetify)
    const discordId = siteConfig.socials.discord.split('/').pop();
    if (discordId) {
      const lanyardRes = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
        next: { revalidate: 0 }, // always fresh
      });
      
      if (lanyardRes.ok) {
        const { data } = await lanyardRes.json();
        if (data?.listening_to_spotify && data.spotify) {
          return NextResponse.json({
            isPlaying: true,
            title: data.spotify.song,
            artist: data.spotify.artist,
            album: data.spotify.album,
            albumImageUrl: data.spotify.album_art_url,
            songUrl: `https://open.spotify.com/track/${data.spotify.track_id}`,
            timestamps: data.spotify.timestamps, // { start: number, end: number }
          });
        }
      }
    }

    return NextResponse.json({ isPlaying: false });
  } catch (error) {
    console.error("Spotify API Route Error:", error);
    return NextResponse.json({ isPlaying: false });
  }
}
