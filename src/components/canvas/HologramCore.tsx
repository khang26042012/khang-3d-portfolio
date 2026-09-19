'use client';

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface HologramCoreProps {
  scrollProgress: { current: number };
}

export function HologramCore({ scrollProgress }: HologramCoreProps) {
  const outerMesh = useRef<THREE.Mesh>(null);
  const innerMesh = useRef<THREE.Mesh>(null);
  const coreSphere = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  // Load AI Generated Texture created by ag/gemini-3.1-flash-image
  const texture = useLoader(THREE.TextureLoader, '/cosmic-core.jpg');

  useFrame((state) => {
    const p = scrollProgress.current;
    const time = state.clock.getElapsedTime();

    if (outerMesh.current) {
      outerMesh.current.rotation.x = time * 0.25 + p * 3;
      outerMesh.current.rotation.y = time * 0.35 + p * 2.5;
      const scale = 1 + Math.sin(time * 2) * 0.04 + (1 - Math.min(p * 2, 0.7));
      outerMesh.current.scale.set(scale, scale, scale);
    }

    if (coreSphere.current) {
      coreSphere.current.rotation.y = time * 0.5 + p * 4;
      coreSphere.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }

    if (innerMesh.current) {
      innerMesh.current.rotation.x = -time * 0.4 - p * 2;
      innerMesh.current.rotation.z = time * 0.3;
    }

    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.2;
      ring1.current.rotation.y = time * 0.2 + p * 2;
    }

    if (ring2.current) {
      ring2.current.rotation.y = Math.PI / 4 + time * 0.3;
      ring2.current.rotation.z = time * 0.25 - p * 2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <group position={[0, 0, 0]}>
        {/* Lõi Cầu Texture Sinh Bởi AI ag/gemini-3.1-flash-image */}
        <mesh ref={coreSphere}>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.2}
            metalness={0.8}
            emissive="#0891b2"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Khung Wireframe Lồng Bên Ngoài */}
        <mesh ref={outerMesh}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            wireframe
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Khối Tinh Thể Năng Lượng Đa Diện */}
        <mesh ref={innerMesh}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            wireframe
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Vành Đai Cyber Rings */}
        <mesh ref={ring1}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
        </mesh>

        <mesh ref={ring2}>
          <torusGeometry args={[2.7, 0.015, 16, 100]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}
