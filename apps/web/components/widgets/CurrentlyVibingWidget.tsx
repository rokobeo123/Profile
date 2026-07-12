"use client";

import { useEffect, useState } from 'react';
import { siteConfig } from '../../config/site.config';

export function CurrentlyVibingWidget() {
  const analytics = siteConfig.analytics;
  const [visitsData, setVisitsData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch('/api/visits');
        if (res.ok) {
          const data = await res.json();
          setVisitsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch visits", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
    // Poll every 10 seconds for real-time updates
    const interval = setInterval(fetchVisits, 10000);
    return () => clearInterval(interval);
  }, []);

  // Calculate past 30 days
  const chartData = [];
  let totalVisits = 0;
  
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = visitsData[dateStr] || 0;
    chartData.push(count);
    totalVisits += count;
  }

  // Fallback to config if total is very low or 0 (so the chart isn't empty on first run)
  const finalTotalVisits = totalVisits > 0 ? totalVisits : analytics.totalVisits;
  const finalChartData = totalVisits > 0 ? chartData : analytics.chartData;
  const growth = analytics.growth;
  
  let maxCount = 1;
  for (const count of finalChartData) {
    if (count > maxCount) maxCount = count;
  }

  return (
    <div className="glass-panel p-6 md:p-8 h-full flex flex-col group relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 z-10">
        <h2 className="text-sm font-semibold text-white tracking-wide lowercase flex items-center gap-2">
          visitor analytics
          {!loading && totalVisits > 0 && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" title="Live"></span>}
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-between w-full z-10 mt-2">
        <div className="h-16 w-full flex items-end gap-1 opacity-80 mb-6 transition-all duration-500">
          {finalChartData.map((count, i) => {
             const height = Math.max(5, (count / maxCount) * 100);
             return <div key={i} className="flex-1 bg-gradient-to-t from-purple-900/50 via-[#8B5CF6] to-indigo-400 rounded-t-sm transition-all duration-500" style={{ height: `${height}%` }} title={`${count} visits`} />
          })}
        </div>

        <div className="flex items-end justify-between mt-auto">
           <div>
             <p className="text-3xl md:text-4xl font-light text-white tabular-nums tracking-tight leading-none mb-1 transition-all duration-500">
               {finalTotalVisits.toLocaleString()}
             </p>
             <p className="text-[10px] md:text-xs text-[var(--color-text-secondary)]">total visits (30d)</p>
           </div>
           <div className={`flex items-center space-x-1 text-xs font-medium ${growth >= 0 ? 'text-[#10B981]' : 'text-red-400'}`}>
             <span>{growth >= 0 ? '↑' : '↓'}</span>
             <span>{Math.abs(growth)}%</span>
           </div>
        </div>
      </div>
    </div>
  );
}
