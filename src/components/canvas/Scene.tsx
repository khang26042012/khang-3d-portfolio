'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ParticleUniverse } from './ParticleUniverse';
import { HologramCore } from './HologramCore';

interface SceneProps {
  scrollProgress: { current: number };
}

function CameraRig({ scrollProgress }: { scrollProgress: { current: number } }) {
  useFrame((state) => {
    const p = scrollProgress.current;
    // Camera di chuyển mượt theo trục Z và xoay góc nhẹ tạo chiều sâu 3D
    // Khi cuộn xuống: Camera lướt qua Hologram vào vũ trụ dự án
    const targetZ = 6 - p * 3.5;
    const targetY = -p * 2.0;
    const targetX = Math.sin(p * Math.PI) * 1.2;

    state.camera.position.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      0.08
    );
    state.camera.lookAt(0, -p * 1.5, 0);
  });
  return null;
}

export function Scene({ scrollProgress }: SceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.devicePixelRatio > 2.5);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 50 }}
        // Tối ưu triệt để: Giới hạn pixel ratio tối đa 1.5 trên mobile để giữ vững 60fps
        dpr={isMobile ? [1, 1.3] : [1, 2]}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true
        }}
      >
        <color attach="background" args={['#05060d']} />

        {/* Ánh sáng đa chiều */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#06b6d4" />
        <directionalLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" />

        {/* Vật thể không gian 3D */}
        <CameraRig scrollProgress={scrollProgress} />
        <HologramCore scrollProgress={scrollProgress} />
        <ParticleUniverse scrollProgress={scrollProgress} />

        {/* Postprocessing tinh gọn, mượt mà */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            intensity={isMobile ? 0.6 : 1.0}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={200}
          />
          <Vignette eskil={false} offset={0.15} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
