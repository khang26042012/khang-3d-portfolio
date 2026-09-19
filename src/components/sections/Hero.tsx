'use client';

import React from 'react';
import { ArrowDown, Cpu, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/mockData';

export function Hero() {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-20">
      {/* Glow highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto z-10 flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{profile.status}</span>
        </div>

        {/* Name Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            {profile.name}
          </span>
        </h1>

        {/* Dynamic Subtitle */}
        <p className="text-lg sm:text-xl font-mono text-cyan-400 mb-3 tracking-wide">
          {profile.role}
        </p>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mb-8 leading-relaxed">
          {profile.bio}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all"
          >
            <span>Xem Các Dự Án</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-200 font-medium text-sm hover:bg-white/10 backdrop-blur-md active:scale-95 transition-all"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Khám Phá Công Nghệ</span>
          </button>
        </div>

        {/* Quick Highlights / Metrics */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg pt-4 border-t border-white/10">
          {profile.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-bold font-mono text-white">{m.value}</span>
              <span className="text-[10px] sm:text-xs text-zinc-500 font-mono tracking-wider uppercase mt-1">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 pointer-events-none animate-bounce">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Cuộn để du hành</span>
        <ArrowDown className="w-4 h-4 text-cyan-400" />
      </div>
    </section>
  );
}
