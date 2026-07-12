"use client";

interface Props {
  whatIDo?: string | null;
}

export function WhatIDoWidget({ whatIDo }: Props) {
  return (
    <div className="glass-panel p-6 md:p-8 h-full flex flex-col group overflow-y-auto custom-scrollbar relative gap-4">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white/80">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.5 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
        </div>
        <h2 className="text-sm font-semibold text-white tracking-wide lowercase">what i do</h2>
      </div>

      <div className="text-sm text-[var(--color-text-secondary)] leading-loose">
        {whatIDo ? (
          whatIDo.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))
        ) : (
          <>
            i design and build beautiful,<br/>
            scalable web applications.<br/><br/>
            focused on crafting seamless user<br/>
            experiences with modern tech.<br/>
          </>
        )}
      </div>
    </div>
  );
}
