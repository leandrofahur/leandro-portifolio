'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';

const STAR_COUNT = 1500;

export default function Stars() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const texture = useLoader(THREE.TextureLoader, '/textures/star.png');

  const { geometry, speeds, phases, colors } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3); // RGB per star
    const speeds = new Float32Array(STAR_COUNT);
    const phases = new Float32Array(STAR_COUNT);
  
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      positions.set([x, y, z], i * 3);
  
      const isPulsar = Math.random() < 0.08;
      speeds[i] = isPulsar
        ? Math.random() * 4 + 4       // fast
        : Math.random() * 0.6 + 0.05; // slow
      phases[i] = Math.random() * Math.PI * 2;
  
      // Initial color: white
      colors.set([1, 1, 1], i * 3);
    }
  
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return { geometry, speeds, phases, colors };
  }, []);
  

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const time = clock.getElapsedTime();
      let totalBlink = 0;

      for (let i = 0; i < STAR_COUNT; i++) {
        const blink = 0.5 + Math.abs(Math.sin(time * speeds[i] + phases[i])) * 0.5;
        totalBlink += blink;
      }

      materialRef.current.opacity = totalBlink / STAR_COUNT;
    }
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        map={texture}
        color="#ffffff"
        size={0.7}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
