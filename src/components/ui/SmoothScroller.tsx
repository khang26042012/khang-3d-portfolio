'use client';

import React, { useEffect, useRef } from 'react';

interface SmoothScrollerProps {
  children: React.ReactNode;
  onScrollProgress?: (progress: number) => void;
}

export function SmoothScroller({ children, onScrollProgress }: SmoothScrollerProps) {
  useEffect(() => {
    let lenisInstance: any = null;
    let rafId: number;

    // Use dynamic import to prevent any SSR access to window/document
    if (typeof window !== 'undefined') {
      import('lenis').then((module) => {
        const Lenis = module.default;
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 1.5,
          infinite: false,
        });

        lenisInstance.on('scroll', (e: any) => {
          if (onScrollProgress && e.progress !== undefined) {
            onScrollProgress(e.progress);
          }
        });

        function raf(time: number) {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, [onScrollProgress]);

  return <div className="relative z-10">{children}</div>;
}
