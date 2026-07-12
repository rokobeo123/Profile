"use client";
import { useEffect, useState } from 'react';

export function StatsWidget({ weatherData }: { weatherData?: any }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Clock
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return { time: `${hours.toString().padStart(2, '0')}:${minutes}`, ampm };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  };

  // OpenWeatherMap icons to emojis mapping (basic)
  const getIcon = (iconCode: string) => {
    if (!iconCode) return '⛅';
    if (iconCode.includes('01')) return '☀️';
    if (iconCode.includes('02')) return '⛅';
    if (iconCode.includes('03') || iconCode.includes('04')) return '☁️';
    if (iconCode.includes('09') || iconCode.includes('10')) return '🌧️';
    if (iconCode.includes('11')) return '⛈️';
    if (iconCode.includes('13')) return '❄️';
    if (iconCode.includes('50')) return '🌫️';
    return '⛅';
  };

  return (
    <div className="glass-panel p-6 md:p-8 h-full flex flex-col justify-between group">
      
      {/* Clock Section */}
      <div className="flex flex-col items-start md:items-end w-full">
         <div className="flex items-baseline space-x-1">
           <span className="text-4xl md:text-5xl xl:text-6xl font-light text-white tracking-tighter tabular-nums drop-shadow-md whitespace-nowrap">
             {time ? formatTime(time).time : '--:--'}
           </span>
           <span className="text-xs md:text-sm font-semibold text-[var(--color-accent-primary)] uppercase tracking-widest">
             {time ? formatTime(time).ampm : '--'}
           </span>
         </div>
         <p className="text-[10px] md:text-xs xl:text-sm text-[var(--color-text-secondary)] mt-1 font-medium truncate w-full md:text-right">
           {time ? formatDate(time) : 'Loading...'}
         </p>
      </div>

      <div className="w-full h-px bg-white/5 my-auto" />

      {/* Weather Section */}
      <div className="flex flex-col items-start md:items-start w-full">
         <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
            <span className="text-4xl xl:text-5xl drop-shadow-xl">{weatherData ? getIcon(weatherData.icon) : '☁️'}</span>
            <div className="flex flex-col">
               <span className="text-2xl xl:text-3xl font-light text-white tracking-tight leading-none">
                 {weatherData ? Math.round(weatherData.temp) : '--'}°C
               </span>
               <span className="text-xs md:text-sm text-[var(--color-text-secondary)] mt-1 truncate capitalize">
                 {weatherData ? weatherData.description : 'Loading...'}
               </span>
            </div>
         </div>
         
         <div className="flex flex-col gap-0.5 text-xs text-[var(--color-text-tertiary)] font-medium mt-2">
            <span>{weatherData ? weatherData.city : 'Loading...'}</span>
         </div>
      </div>



    </div>
  );
}

