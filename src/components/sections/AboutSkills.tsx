'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/mockData';
import { Box, Layers, Sparkles, Activity, Eye, Globe, Code2, Palette, Compass, Cpu, Cloud, Server, Terminal, GitBranch } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Box: <Box className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  Server: <Server className="w-4 h-4" />,
  Terminal: <Terminal className="w-4 h-4" />,
  GitBranch: <GitBranch className="w-4 h-4" />,
};

export function AboutSkills() {
  const { skills, timeline } = PORTFOLIO_DATA;

  return (
    <section id="about" className="min-h-screen py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 block">
            01 // KIẾN TRÚC & KỸ NĂNG
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Đột Phá Hiệu Năng & Trải Nghiệm Không Gian
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Kết hợp giữa tư duy lập trình hệ thống nghiêm ngặt và nghệ thuật mô phỏng 3D thời gian thực.
          </p>
        </div>

        {/* Skills Grid */}
        <div id="skills" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-cyber-card border border-cyber-border backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40"
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center gap-2 text-zinc-300">
                          <span className="text-cyan-400">{iconMap[skill.icon] || <Sparkles className="w-3.5 h-3.5" />}</span>
                          {skill.name}
                        </span>
                        <span className="text-zinc-500">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Journey */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-mono text-sm text-cyan-400 uppercase tracking-widest text-center mb-8">
            Hành Trình Phát Triển (Milestones)
          </h3>
          <div className="relative border-l border-indigo-500/20 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyber-bg border-2 border-cyan-400 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-mono text-indigo-400 font-semibold">{item.year}</span>
                <h4 className="text-base font-bold text-white mt-1">{item.role}</h4>
                <p className="text-xs text-zinc-400 font-mono mb-2">{item.company}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
