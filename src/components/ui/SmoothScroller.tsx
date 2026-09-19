'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollerProps {
  children: React.ReactNode;
  onScrollProgress?: (progress: number) => void;
}

export function SmoothScroller({ children, onScrollProgress }: SmoothScrollerProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis instance - Cực kỳ tối ưu trên cả mobile touch và desktop mouse wheel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [onScrollProgress]);

  return <div className="relative z-10">{children}</div>;
}
