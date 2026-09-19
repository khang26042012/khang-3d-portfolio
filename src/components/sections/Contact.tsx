'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/mockData';
import { Send, CheckCircle2, MessageSquare, Mail, Terminal } from 'lucide-react';

export function Contact() {
  const { profile } = PORTFOLIO_DATA;
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-4 relative z-10 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 block">
            03 // KẾT NỐI
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Khởi Tạo Dự Án Mới
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Bạn đang có ý tưởng về một trải nghiệm web 3D độc bản hay một kiến trúc hệ thống tốc độ cao? Hãy để lại tin nhắn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Info Card */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-cyber-card border border-cyber-border backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Thông Tin Trực Tiếp
              </h3>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                Sẵn sàng đồng hành cùng các đội ngũ sáng tạo, studio hoặc dự án độc lập.
              </p>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <a href={`mailto:${profile.social.email}`} className="hover:text-cyan-300 transition-colors">
                    {profile.social.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Discord: khang.dev</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Trạng thái: Nhận dự án mới
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 p-6 sm:p-8 rounded-2xl bg-cyber-card border border-cyber-border backdrop-blur-xl space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">TÊN CỦA BẠN</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ví dụ: Alex Nguyễn"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">EMAIL LIÊN HỆ</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">NỘI DUNG TRAO ĐỔI</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mô tả ngắn về ý tưởng dự án hoặc yêu cầu hợp tác..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-indigo-500/25 active:scale-98 transition-all"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Đã gửi thành công!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi Tin Nhắn</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-cyber-border text-center text-xs font-mono text-zinc-500">
        <p>© {new Date().getFullYear()} {profile.name} — Designed for 60FPS Space Exploration.</p>
      </footer>
    </section>
  );
}
