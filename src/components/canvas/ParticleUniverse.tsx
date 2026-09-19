'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleUniverseProps {
  scrollProgress: { current: number };
}

export function ParticleUniverse({ scrollProgress }: ParticleUniverseProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1800; // Tối ưu hoàn hảo cho mobile 60fps, không ngốn GPU

  const [positions, initialPositions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const color1 = new THREE.Color('#6366f1'); // Indigo
    const color2 = new THREE.Color('#06b6d4'); // Cyan
    const color3 = new THREE.Color('#a855f7'); // Violet

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Vùng phân bố hình cầu và hình trụ xoắn ốc (Cosmic Cylinder)
      const radius = 2.5 + Math.random() * 8.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 2;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = (Math.random() - 0.5) * 20;
      const z = radius * Math.sin(theta) * Math.sin(phi);

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      initPos[i3] = x;
      initPos[i3 + 1] = y;
      initPos[i3 + 2] = z;

      // Pha màu gradient ngẫu nhiên giữa 3 tone màu
      const mixRatio = Math.random();
      const mixedColor = mixRatio < 0.5 
        ? color1.clone().lerp(color2, mixRatio * 2) 
        : color2.clone().lerp(color3, (mixRatio - 0.5) * 2);

      cols[i3] = mixedColor.r;
      cols[i3 + 1] = mixedColor.g;
      cols[i3 + 2] = mixedColor.b;

      sca[i] = Math.random() * 2.0 + 0.5;
    }

    return [pos, initPos, cols, sca];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const progress = scrollProgress.current;
    const time = state.clock.getElapsedTime();

    // Xoay nhẹ vũ trụ hạt
    pointsRef.current.rotation.y = time * 0.05 + progress * Math.PI * 1.5;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1 + progress * 0.3;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    // Hiệu ứng sóng hạt dập dềnh khi cuộn
    for (let i = 0; i < count; i += 2) {
      const i3 = i * 3;
      const originalY = initialPositions[i3 + 1];
      // Hạt dạt ra khi cuộn sâu
      const wave = Math.sin(time * 1.5 + initialPositions[i3] * 0.5) * 0.3;
      const scrollOffset = progress * 10;
      array[i3 + 1] = ((originalY - scrollOffset + 30) % 20) - 10 + wave;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
