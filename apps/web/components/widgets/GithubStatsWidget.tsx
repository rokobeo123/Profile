import { getGithubData } from '../../lib/github';

export async function GithubStatsWidget() {
  const stats = await getGithubData();

  return (
    <div className="glass-panel p-6 md:p-8 h-full flex flex-col group relative overflow-hidden">
      
      <div className="flex items-center justify-between mb-6 z-10">
        <h2 className="text-sm font-semibold text-white tracking-wide lowercase">github stats</h2>
        <a href={`https://github.com/${process.env.GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-text-tertiary)] hover:text-white transition-colors cursor-pointer">view more</a>
      </div>

      <div className="flex-1 flex flex-col justify-center w-full z-10">
        {stats ? (
          <div className="flex flex-col h-full justify-between">
            {/* Top row: Contributions & Graph */}
            <div className="flex items-end justify-between w-full mb-6">
              <div>
                <p className="text-5xl md:text-6xl font-light text-white tabular-nums tracking-tighter leading-none mb-1">
                  {stats.totalContributions?.toLocaleString() || 0}
                </p>
                <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">contributions this year</p>
              </div>
              {/* Real Activity Graph */}
              <div className="flex items-end gap-0.5 md:gap-1 h-16 opacity-80 flex-1 max-w-[200px] md:max-w-[300px] ml-4 justify-end">
                 {stats.weeks?.slice(-20).map((week: any, i: number) => {
                    const maxCount = 20; // arbitrary baseline for scaling
                    const weekTotal = week.contributionDays.reduce((acc: number, day: any) => acc + day.contributionCount, 0);
                    const height = Math.min(100, Math.max(10, (weekTotal / maxCount) * 100));
                    return (
                      <div key={i} className="flex-1 max-w-[8px] bg-gradient-to-t from-transparent to-[#8B5CF6] rounded-t-sm" style={{ height: `${height}%`, opacity: height > 20 ? 1 : 0.4 }} title={`${weekTotal} contributions`} />
                    )
                 })}
              </div>
            </div>

            {/* Middle row: Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
              <div className="flex justify-between md:block items-center">
                <p className="text-xl md:text-2xl font-semibold text-white tabular-nums">{stats.followers?.toLocaleString() || 0}</p>
                <p className="text-[10px] md:text-xs text-[var(--color-text-secondary)]">followers</p>
              </div>
              <div className="flex justify-between md:block items-center">
                <p className="text-xl md:text-2xl font-semibold text-white tabular-nums">{stats.publicRepos || 0}</p>
                <p className="text-[10px] md:text-xs text-[var(--color-text-secondary)]">public repos</p>
              </div>
              <div className="flex justify-between md:block items-center">
                <p className="text-xl md:text-2xl font-semibold text-white tabular-nums">0</p>
                <p className="text-[10px] md:text-xs text-[var(--color-text-secondary)]">public gists</p>
              </div>
            </div>

            {/* Bottom row: Language */}
            <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-white/5">
              <span className="text-[var(--color-text-secondary)]">Status</span>
              <div className="flex items-center space-x-3">
                <span className="text-[#10B981] font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  Active
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/50">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </div>
            <p className="text-white font-medium mb-1">GitHub Not Connected</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Connect your GitHub account to display statistics.</p>
          </div>
        )}
      </div>
    </div>
  );
}
