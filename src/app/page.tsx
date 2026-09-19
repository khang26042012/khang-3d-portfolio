'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { AboutSkills } from '@/components/sections/AboutSkills';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { SmoothScroller } from '@/components/ui/SmoothScroller';

// SSR disabled for WebGL Canvas
const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[#05060d] flex items-center justify-center z-0">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-cyan-400 tracking-widest">KHỞI TẠO VŨ TRỤ 3D...</span>
        </div>
      </div>
    )
  }
);

export default function Home() {
  const scrollRef = useRef<{ current: number }>({ current: 0 });

  const handleScrollProgress = (p: number) => {
    scrollRef.current.current = p;
  };

  // Fallback native scroll listener for instant feedback
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        scrollRef.current.current = window.scrollY / total;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative bg-cyber-bg min-h-screen text-white overflow-hidden">
      {/* 3D WebGL Background Scene */}
      <Scene scrollProgress={scrollRef.current} />

      {/* Smooth Scroller HTML Layer */}
      <SmoothScroller onScrollProgress={handleScrollProgress}>
        <Navbar />
        <Hero />
        <AboutSkills />
        <Projects />
        <Contact />
      </SmoothScroller>
    </main>
  );
}
