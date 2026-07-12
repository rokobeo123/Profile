"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface GalleryClientProps {
  images: { src: string; alt: string }[];
}

export function GalleryClient({ images }: GalleryClientProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayedImages = isExpanded ? images : images.slice(0, 4);
  const hasMore = images.length > 4;

  return (
    <div className="glass-panel p-6 md:p-8 h-full flex flex-col group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-white tracking-wide lowercase">gallery</h2>
        {hasMore && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-[var(--color-text-tertiary)] hover:text-white transition-colors cursor-pointer"
          >
            {isExpanded ? 'show less' : 'view all'}
          </button>
        )}
      </div>

      <div className={`flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto pr-1`}>
        {displayedImages.map((img, idx) => (
          <motion.div 
            key={idx} 
            onClick={() => setSelectedImage(img.src)}
            className="relative w-full aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden group/img cursor-pointer bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300"
          >
             <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl bg-[var(--color-background-primary)]">
               {img.src.includes('placeholder') ? '🌌' : (
                 <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
               )}
             </div>
             {/* Dimming overlay removed for brighter photos, added a very subtle hover overlay instead */}
             <div className="absolute inset-0 bg-black/0 group-hover/img:bg-white/10 transition-colors duration-300 z-10" />
          </motion.div>
        ))}
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="relative w-full max-w-5xl aspect-video max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={selectedImage} alt="Zoomed" className="w-full h-full object-contain" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
