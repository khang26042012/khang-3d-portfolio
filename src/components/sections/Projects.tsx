'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/mockData';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export function Projects() {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="min-h-screen py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 block">
            02 // DỰ ÁN NỔI BẬT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Showcase Công Nghệ & Sản Phẩm
          </h2>
          <p className="text-sm text-zinc-400">
            Các dự án được kiến trúc để đạt độ mượt mà cao nhất trên đa thiết bị.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="group p-6 rounded-2xl bg-cyber-card border border-cyber-border hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl shadow-black/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-400 hover:text-white transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-indigo-400 mb-4">{proj.tagline}</p>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 line-clamp-4">
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-white/5 mb-4 border border-white/5">
                  {proj.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="block text-[10px] text-zinc-500 font-mono uppercase">{m.label}</span>
                      <span className="text-xs font-bold font-mono text-cyan-300">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-950/40 text-indigo-300 border border-indigo-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
