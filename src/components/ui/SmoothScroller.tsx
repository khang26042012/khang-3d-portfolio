'use client';

import React, { useEffect, useRef } from 'react';

interface SmoothScrollerProps {
  children: React.ReactNode;
  onScrollProgress?: (progress: number) => void;
}

export function SmoothScroller({ children, onScrollProgress }: SmoothScrollerProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let active = true;
    let rafId: number;

    // Dynamically import Lenis on client side only
    import('lenis').then(({ default: Lenis }) => {
      if (!active) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.5,
        infinite: false,
      });
      lenisRef.current = lenis;

      const handleScroll = (e: any) => {
        if (onScrollProgress && e.progress !== undefined) {
          onScrollProgress(e.progress);
        }
      };

      lenis.on('scroll', handleScroll);

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, [onScrollProgress]);

  return <div className="relative z-10">{children}</div>;
}
