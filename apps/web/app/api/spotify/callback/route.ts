import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided in the URL' });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return NextResponse.json({ 
      error: 'Missing SPOTIFY_CLIENT_SECRET in .env.local',
      instructions: 'Please paste your Client Secret in .env.local as SPOTIFY_CLIENT_SECRET="your_secret_here" and restart the dev server.'
    });
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    // Hardcoding to the exact URL used in the authorization link to prevent Cloudflare Tunnel proxy mismatch
    const redirect_uri = 'https://inzm.io.vn/api/spotify/callback';

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.refresh_token) {
      return new NextResponse(`
        <html>
          <body style="background: #121212; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0;">
            <h1 style="color: #1DB954;">Success!</h1>
            <p>Your Spotify Refresh Token is:</p>
            <textarea readonly style="width: 400px; height: 100px; padding: 12px; border-radius: 8px; background: #282828; color: #fff; border: 1px solid #404040; margin-top: 10px;">${data.refresh_token}</textarea>
            <p style="margin-top: 20px;">Copy this token and paste it into our chat!</p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return NextResponse.json({ error: 'Failed to get refresh token', details: data });
  } catch (error) {
    return NextResponse.json({ error: 'Network error', details: String(error) });
  }
}
