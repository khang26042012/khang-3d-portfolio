'use client';

import React from 'react';
import { Terminal, Github, Send, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/mockData';

export function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 backdrop-blur-md bg-cyber-bg/60 border-b border-cyber-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-cyber-bg rounded-[7px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="font-mono font-bold text-sm tracking-wider text-white">
            KHANG<span className="text-cyan-400">.3D</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-zinc-300">
          <button onClick={() => scrollTo('about')} className="hover:text-cyan-400 transition-colors">01. About</button>
          <button onClick={() => scrollTo('skills')} className="hover:text-cyan-400 transition-colors">02. Skills</button>
          <button onClick={() => scrollTo('projects')} className="hover:text-cyan-400 transition-colors">03. Projects</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-cyan-400 transition-colors">04. Contact</button>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-mono text-xs font-semibold hover:opacity-90 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </header>
  );
}
