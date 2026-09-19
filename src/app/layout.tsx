import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phan Trọng Khang | Creative 3D Portfolio",
  description: "Next.js 15 & Three.js 3D Scrollytelling Portfolio. High-performance, 60FPS mobile optimized.",
  keywords: ["Three.js", "React Three Fiber", "Next.js 15", "Portfolio", "WebGL", "Creative Developer"],
  authors: [{ name: "Phan Trọng Khang" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="bg-cyber-bg text-white antialiased min-h-screen selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
