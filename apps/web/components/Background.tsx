"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "../config/site.config";

export const Background = React.memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const bgUrl = siteConfig.profile.background;
  const isVideo = bgUrl && (bgUrl.endsWith('.mp4') || bgUrl.endsWith('.webm') || bgUrl.endsWith('.ogg'));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    if (mediaQuery.matches || bgUrl) return; // Don't track mouse if using static bg

    let requestRef: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to throttle mouse movements
      requestRef = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, [bgUrl]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[var(--color-background-primary)]">
      
      {bgUrl ? (
        isVideo ? (
          <video 
            src={bgUrl} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        ) : (
          <img 
            src={bgUrl} 
            alt="background" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )
      ) : (
        <>
          {/* Noise Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay z-10" 
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />

          {/* Pure CSS Animated Gradients - Hardware Accelerated */}
          <div 
            className="absolute inset-0 opacity-50 transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: reducedMotion ? 'none' : `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              background: `
                radial-gradient(circle at 15% 10%, rgba(30, 27, 75, 0.6) 0%, transparent 40%),
                radial-gradient(circle at 85% 80%, rgba(76, 29, 149, 0.4) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)
              `
            }}
          />
        </>
      )}
    </div>
  );
});

Background.displayName = 'Background';
