import Image from 'next/image';
import { getDiscordPresence } from '../../lib/discord';
import { siteConfig } from '../../config/site.config';
import { LocalTime } from '../LocalTime';

export async function ProfileWidget() {
  const profile = siteConfig.profile;
  const discordPresence = await getDiscordPresence(process.env.DISCORD_ID || "");
  
  // Dynamic Discord Status from Lanyard
  const discordStatus = discordPresence?.discord_status || 'offline';
  const isOnline = discordStatus !== 'offline';
  
  let statusColor = "#747F8D"; // Offline gray
  let statusText = "Offline";
  if (discordStatus === 'online') {
    statusColor = "#10B981"; // Green
    statusText = "Online";
  } else if (discordStatus === 'idle') {
    statusColor = "#F59E0B"; // Yellow
    statusText = "Idle";
  } else if (discordStatus === 'dnd') {
    statusColor = "#EF4444"; // Red
    statusText = "Do Not Disturb";
  }

  return (
    <div className="glass-panel p-6 md:p-8 h-full w-full flex flex-col justify-between relative overflow-hidden group">

      {/* Top Section: Avatar and Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full">

        {/* Avatar Container */}
        <div className="relative shrink-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40 group">
           
           {/* Glow (opacity breathing only, no scaling) */}
           <div className="absolute inset-[-20%] rounded-full bg-purple-500/20 blur-2xl z-0 pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite' }}>
              <style>{`
                @keyframes glowPulse {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 0.7; }
                }
                @keyframes cloudFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(2px); }
                }
              `}</style>
           </div>

           {/* Back Clouds (z-10) - Precise 2.5px adjustment */}
           <div className="absolute top-1/2 left-1/2 pointer-events-none z-10" style={{ width: '170%', height: '170%', transform: 'translate(calc(-46% - 2px), calc(-53% + 2.5px))' }}>
              <div className="w-full h-full" style={{ animation: 'cloudFloat 8s ease-in-out infinite' }}>
                <Image 
                  src="/avatar-decor-transparent.png"
                  alt=""
                  fill
                  className="object-contain opacity-50"
                  priority
                />
              </div>
           </div>

           {/* Avatar (z-20) */}
           <div className="relative w-full h-full rounded-full z-20">
              <div className="w-full h-full rounded-full overflow-hidden bg-[var(--color-background-primary)] relative border border-white/10">
                 {profile?.avatar ? (
                   <Image src={profile.avatar} alt="Avatar" fill sizes="160px" className="object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                     {profile?.displayName?.charAt(0) || 'K'}
                   </div>
                 )}
              </div>
           </div>

           {/* Front Clouds (z-30) - Precise 2.5px adjustment */}
           <div className="absolute top-1/2 left-1/2 pointer-events-none z-30" style={{ width: '170%', height: '170%', transform: 'translate(calc(-46% - 2px), calc(-53% + 2.5px))' }}>
              <div className="w-full h-full" style={{ animation: 'cloudFloat 8s ease-in-out infinite' }}>
                <Image 
                  src="/avatar-decor-transparent.png"
                  alt="Avatar Decoration"
                  fill
                  className="object-contain opacity-90"
                  priority
                />
              </div>
           </div>

           {/* Online Indicator (z-40) */}
           <div className="absolute bottom-1 right-2 md:bottom-2 md:right-3 z-40 translate-x-[10px]">
             <div className="relative flex items-center justify-center">
               {/* Soft diffuse ambient glow (Only pulse if online) */}
               {isOnline && <div className="absolute inset-[-10px] rounded-full blur-md animate-pulse" style={{ backgroundColor: statusColor, opacity: 0.2, animationDuration: '3s' }} />}
               
               {/* Background Cutout (Creates the gap effect) */}
               <div className="w-[22px] h-[22px] md:w-7 md:h-7 rounded-full bg-[#13111C]/80 backdrop-blur-sm flex items-center justify-center p-[4px] border border-white/5">
                 {/* The actual dot */}
                 <div className="w-full h-full rounded-full relative overflow-hidden" style={{ 
                   backgroundColor: statusColor, 
                   boxShadow: isOnline ? `0 0 12px ${statusColor}cc` : 'none',
                   background: isOnline ? `linear-gradient(to top right, ${statusColor}, #34D399)` : statusColor
                 }}>
                    {/* Inner glass highlight */}
                    <div className="absolute inset-0 rounded-full bg-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]" />
                    {/* Dynamic ripple (Only if online) */}
                    {isOnline && <div className="absolute inset-[-2px] rounded-full animate-ping opacity-60" style={{ backgroundColor: '#A7F3D0', animationDuration: '2.5s' }} />}
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col pt-2 text-center md:text-left min-w-0">
           <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">{profile?.headline}</p>

           <div className="flex items-center justify-center md:justify-start gap-2 mb-2 w-full">
             <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-none truncate">{profile?.displayName || 'Inzm'}</h1>
             {/* Verified Badge */}
             <div className="w-4 h-4 md:w-5 md:h-5 shrink-0 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white text-[10px]">
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
             </div>
           </div>

           <div className="flex items-center justify-center md:justify-start gap-4 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] mb-3 md:mb-4">
             <span className="truncate">{profile?.handle}</span>
             <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
             <span className="whitespace-nowrap">{profile?.pronouns}</span>
           </div>

           <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line mb-4 max-w-[280px] mx-auto md:mx-0">
             {profile?.biography || "Nguyen Dang Lam."}
           </p>

           <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-[10px] md:text-xs font-medium mt-auto">
              <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="truncate max-w-[100px] md:max-w-none">{profile?.location}</span>
                <span className="mx-1">•</span>
                <LocalTime />
              </div>
              <div className="flex items-center gap-1.5" style={{ color: statusColor }}>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: statusColor, boxShadow: isOnline ? `0 0 8px ${statusColor}` : 'none' }} />
                <span className="capitalize">{statusText}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Social Links Row */}
      <div className="w-full flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 mt-6 pt-4 border-t border-white/5">
         {siteConfig.socials.discord && (
           <a href={siteConfig.socials.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-white/70 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
           </a>
         )}
         {siteConfig.socials.github && (
           <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-white/70 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
           </a>
         )}
         {siteConfig.socials.spotify && (
           <a href={siteConfig.socials.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-white/70 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 14.4c-.2.3-.5.4-.8.2-2.2-1.3-4.9-1.6-8.1-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.5-.8 6.5-.4 9 1.1.3.2.4.5.3.8zm1.1-2.4c-.2.3-.6.4-.9.2-2.5-1.5-6.3-2-8.7-1.1-.4.1-.7-.1-.9-.4-.1-.4.1-.7.4-.9 2.8-1 7-.4 9.8 1.3.3.2.4.6.3.9zm.1-2.5c-3-1.8-8-2-10.8-1.1-.5.1-1-.1-1.2-.6-.1-.5.1-1 .6-1.2 3.3-1 8.8-.8 12.3 1.3.4.2.6.7.4 1.2-.2.4-.7.6-1.3.4z"/></svg>
           </a>
         )}
         {siteConfig.socials.facebook && (
           <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-white/70 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
           </a>
         )}
         {siteConfig.socials.instagram && (
           <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-white/70 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.86 3.89 2.31 7.15 2.16c1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.36-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.36-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm5.8-9.84a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
           </a>
         )}
      </div>

    </div>
  );
}
