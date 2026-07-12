"use client";

export function StatusQuoteWidget() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="glass-panel px-8 py-4 h-full flex items-center justify-between group">
      
      <div className="flex items-center space-x-4 flex-1">
         <span className="text-white/40 text-sm">✦</span>
         <p className="text-sm text-[var(--color-text-secondary)] italic font-serif">
           &quot;focus on the step in front of you, not the whole staircase.&quot;
         </p>
      </div>

      <button 
        onClick={scrollToTop}
        className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/5"
      >
        <span>back to top</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
      </button>

    </div>
  );
}
