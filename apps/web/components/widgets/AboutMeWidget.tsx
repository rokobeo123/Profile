"use client";

interface Props {
  biography?: string | null;
}

export function AboutMeWidget({ biography }: Props) {
  return (
    <div className="glass-panel p-6 md:p-8 h-full flex flex-col group overflow-y-auto custom-scrollbar relative">

      <div>
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white/80">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <h2 className="text-sm font-semibold text-white tracking-wide lowercase">About Me</h2>
        </div>

        <div className="text-sm text-[var(--color-text-secondary)] leading-loose max-w-[280px]">
          {biography ? (
            biography.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))
          ) : (
            <>
              just a random guy who loves<br/>
              code, design, anime and music.<br/><br/>
              i like midnight,<br/>
              rainy days and good coffee.<br/>
              welcome to my little space<br/>
              on the internet.
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 pt-4">
        <div className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs text-white/70 font-medium flex items-center space-x-2 shadow-sm">
          <span>☕</span>
          <span>coffee &gt; sleep</span>
        </div>
        <div className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs text-white/70 font-medium flex items-center space-x-2 shadow-sm">
          <span>&lt;/&gt;</span>
          <span>building stuff</span>
        </div>
      </div>

    </div>
  );
}
