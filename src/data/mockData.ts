export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  featured: boolean;
  link?: string;
  github?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon: string }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Phan Trọng Khang",
    handle: "@phantrongkhangg",
    role: "Creative Technologist & Fullstack 3D Engineer",
    subRole: "Crafting Immersive WebGL & High-Performance Experiences",
    bio: "Kỹ sư công nghệ đam mê tạo ra các trải nghiệm số giao thoa giữa nghệ thuật 3D không gian, vật lý máy tính và kiến trúc hệ thống hiệu năng cao.",
    location: "Vietnam",
    status: "Available for ambitious projects",
    metrics: [
      { label: "High-FPS Optimization", value: "60 FPS" },
      { label: "Production Deployments", value: "35+" },
      { label: "Cloud Uptime", value: "99.98%" },
    ],
    social: {
      github: "https://github.com/khang26042012",
      discord: "https://discord.gg/khang",
      telegram: "https://t.me/khangdev",
      email: "tkphucuakhang20@gmail.com",
    }
  },

  skills: [
    {
      title: "Interactive 3D & WebGL",
      skills: [
        { name: "Three.js", level: 95, icon: "Box" },
        { name: "React Three Fiber", level: 92, icon: "Layers" },
        { name: "GLSL Custom Shaders", level: 88, icon: "Sparkles" },
        { name: "GSAP Scrollytelling", level: 96, icon: "Activity" },
        { name: "Postprocessing & VFX", level: 90, icon: "Eye" },
      ]
    },
    {
      title: "Frontend Architecture",
      skills: [
        { name: "Next.js 15 (App Router)", level: 94, icon: "Globe" },
        { name: "TypeScript", level: 95, icon: "Code2" },
        { name: "Tailwind CSS", level: 98, icon: "Palette" },
        { name: "Lenis Smooth Engine", level: 92, icon: "Compass" },
        { name: "Zustand / Reactive State", level: 90, icon: "Cpu" },
      ]
    },
    {
      title: "Cloud & Systems",
      skills: [
        { name: "Render Cloud / Docker", level: 88, icon: "Cloud" },
        { name: "RESTful & Realtime APIs", level: 92, icon: "Server" },
        { name: "PaperMC / Java Systems", level: 90, icon: "Terminal" },
        { name: "CI/CD & Git Automation", level: 89, icon: "GitBranch" },
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "scrolly-portal",
      title: "Cosmic Nexus 3D",
      tagline: "Ultra-Smooth Multi-Layer WebGL Experience",
      description: "Không gian 3D tương tác theo chiều sâu thanh cuộn sử dụng InstancedMesh, Shader hạt tử tự điều hướng (Particle Morphing) và Camera path nội suy với GSAP ScrollTrigger.",
      tags: ["Next.js 15", "Three.js", "R3F", "GLSL", "GSAP"],
      metrics: [
        { label: "Frame Rate", value: "60 FPS Locked" },
        { label: "Lighthouse", value: "98/100" }
      ],
      featured: true,
      github: "https://github.com/khang26042012/khang-3d-portfolio"
    },
    {
      id: "discord-ai-bridge",
      title: "Discord AI Engine & Bridge",
      tagline: "Realtime Cross-Platform Intelligent Middleware",
      description: "Hệ thống cầu nối thời gian thực đồng bộ dữ liệu người dùng, phân tích hội thoại tự động qua LLM và tích hợp websocket hai chiều độ trễ siêu thấp.",
      tags: ["TypeScript", "Node.js", "Discord.js", "REST API", "WebSocket"],
      metrics: [
        { label: "Latency", value: "< 25ms" },
        { label: "Concurrents", value: "10K+" }
      ],
      featured: true,
      github: "https://github.com/khang26042012/DiscordBridge"
    },
    {
      id: "pikamc-ecosystem",
      title: "High-Performance Cloud Gaming Mesh",
      tagline: "Hybrid Paper & Geyser Cross-Play Infrastructure",
      description: "Hạ tầng máy chủ hỗ trợ đa nền tảng PC (Java) và Mobile (Bedrock), tích hợp plugin tùy biến, tối ưu bộ nhớ hạt nhân và resource pack dynamic.",
      tags: ["Java", "PaperMC", "Geyser", "Floodgate", "Linux"],
      metrics: [
        { label: "Players", value: "Multi-Server" },
        { label: "TPS", value: "20.0 Flat" }
      ],
      featured: true,
      github: "https://github.com/khang26042012"
    }
  ] as Project[],

  timeline: [
    {
      year: "2025 - Hiện tại",
      role: "Creative Fullstack Architect",
      company: "Independent / Digital Space",
      description: "Tiên phong nghiên cứu WebGL trên di động, kiến trúc Scrollytelling thế hệ mới và tích hợp AI Agent vào hạ tầng tự động."
    },
    {
      year: "2024",
      role: "Core Systems Developer",
      company: "Gaming Cloud Ecosystem",
      description: "Xây dựng hệ sinh thái game server đa giao thức, tối ưu hóa I/O và phát triển các bộ công cụ CI/CD tự động."
    },
    {
      year: "2023",
      role: "Frontend Engineer",
      company: "Interactive Web Apps",
      description: "Phát triển giao diện người dùng reactive, thư viện hoạt họa GSAP và ứng dụng thời gian thực."
    }
  ]
};
