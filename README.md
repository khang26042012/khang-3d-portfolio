# 🌌 Khang 3D Portfolio — Next.js 15 & Three.js

A high-performance, mobile-optimized 3D Scrollytelling portfolio built with **Next.js 15 (Server Mode)**, **React Three Fiber (R3F)**, **Three.js**, **GSAP**, **Lenis Smooth Scroll**, and **Tailwind CSS**.

---

## ⚡ Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router, Server Mode `next start`)
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Postprocessing:** `@react-three/postprocessing` (Selective Bloom, Depth & Vignette)
- **Scrollytelling & Physics:** GSAP + Lenis Smooth Scroll Engine
- **Mobile Optimization:** 
  - Dynamic DPR clamped to `[1, 1.3]` on mobile to guarantee smooth 60 FPS.
  - Instanced particles & lightweight wireframe shaders.
  - SSR-safe lazy loading with fallback skeleton.
- **Deployment:** Render Web Service (Automated CI/CD via `render.yaml` blueprint)

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Render

Configured via `render.yaml` blueprint:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Node Version:** `20.18.0`
