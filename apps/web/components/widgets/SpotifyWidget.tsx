"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  timestamps?: {
    start: number;
    end: number;
  };
}

function formatTime(ms: number) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function SpotifyWidget() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timeString, setTimeString] = useState({ current: '00:00', total: '00:00' });

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify/now-playing');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (data?.isPlaying) {
          setSpotifyData(data);
        } else {
          setSpotifyData(null);
        }
      } catch (err) {
        setSpotifyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!spotifyData?.timestamps) return;

    const updateProgress = () => {
      const now = Date.now();
      const { start, end } = spotifyData.timestamps!;
      
      const totalMs = end - start;
      const currentMs = now - start;
      
      const percent = Math.min(Math.max((currentMs / totalMs) * 100, 0), 100);
      
      setProgress(percent);
      setTimeString({
        current: formatTime(currentMs),
        total: formatTime(totalMs)
      });
    };

    updateProgress();
    const ticker = setInterval(updateProgress, 1000);
    return () => clearInterval(ticker);
  }, [spotifyData]);

  return (
    <div className="glass-panel p-6 md:p-8 h-full w-full flex flex-col justify-between group">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
         <span className="text-sm font-semibold text-white tracking-wide lowercase">
            {spotifyData?.isPlaying ? 'now playing' : 'offline'}
         </span>
         <span className={`${spotifyData?.isPlaying ? 'text-[#1DB954]' : 'text-white/40'} text-xl`}>
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 14.4c-.2.3-.5.4-.8.2-2.2-1.3-4.9-1.6-8.1-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.5-.8 6.5-.4 9 1.1.3.2.4.5.3.8zm1.1-2.4c-.2.3-.6.4-.9.2-2.5-1.5-6.3-2-8.7-1.1-.4.1-.7-.1-.9-.4-.1-.4.1-.7.4-.9 2.8-1 7-.4 9.8 1.3.3.2.4.6.3.9zm.1-2.5c-3-1.8-8-2-10.8-1.1-.5.1-1-.1-1.2-.6-.1-.5.1-1 .6-1.2 3.3-1 8.8-.8 12.3 1.3.4.2.6.7.4 1.2-.2.4-.7.6-1.3.4z"/></svg>
         </span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="animate-pulse flex items-center space-x-4">
             <div className="w-24 h-24 bg-white/5 rounded-xl" />
             <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-white/5 rounded" />
                <div className="h-3 w-16 bg-white/5 rounded" />
             </div>
          </div>
        ) : spotifyData ? (
          <div className="flex items-start gap-4 w-full">
            {/* Album Art */}
            <div className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/5 relative">
              <Image 
                src={spotifyData.albumImageUrl} 
                alt={spotifyData.album} 
                fill
                sizes="96px"
                className="object-cover" 
              />
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <p className="text-[10px] md:text-xs text-[var(--color-text-secondary)] mb-0.5 md:mb-1 truncate w-full">{spotifyData.artist}</p>
              <h3 className="text-sm md:text-base font-bold text-white truncate w-full">{spotifyData.title}</h3>
              
              {spotifyData.timestamps && (
                <div className="mt-2 md:mt-3 w-full">
                  <div className="flex justify-between text-[9px] text-[var(--color-text-tertiary)] mb-1 font-mono">
                    <span>{timeString.current}</span>
                    <span>{timeString.total}</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/80 rounded-full shadow-[0_0_8px_white] transition-all duration-1000 ease-linear" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-6">
             <p className="text-sm text-[var(--color-text-secondary)]">Not currently playing</p>
          </div>
        )}
      </div>

      <a 
        href={spotifyData?.songUrl || "https://open.spotify.com"}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full mt-4 flex items-center justify-between px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-medium text-white/80 hover:bg-white/10 transition-colors"
      >
         <span>Open in Spotify</span>
         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </a>

    </div>
  );
}
