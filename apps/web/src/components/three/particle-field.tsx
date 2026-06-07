import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useIsMobile } from '@/hooks/use-is-mobile';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useTheme } from '@/hooks/use-theme';

const generatePositions = (count: number) => {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 40;
    positions[i3 + 1] = (Math.random() - 0.5) * 40;
    positions[i3 + 2] = (Math.random() - 0.5) * 40;
  }

  return positions;
};

export const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  const particlesCount = isMobile ? 300 : 1000;

  const particleColor = theme === 'dark' ? '#c084fc' : '#9333ea';

  const positions = useMemo(() => generatePositions(particlesCount), [particlesCount]);

  useFrame(state => {
    if (!pointsRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const speed = isMobile ? 0.025 : 0.05;
    pointsRef.current.rotation.y = time * speed;
    pointsRef.current.rotation.x = time * (speed * 0.4);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          {...{
            args: [positions, 3],
            array: positions,
            attach: 'attributes-position',
            count: particlesCount,
            itemSize: 3,
          }}
        />
      </bufferGeometry>
      <pointsMaterial
        {...{
          blending: THREE.AdditiveBlending,
          color: particleColor,
          opacity: theme === 'dark' ? 1 : isMobile ? 0.6 : 0.8,
          size: theme === 'dark' ? (isMobile ? 0.04 : 0.05) : isMobile ? 0.025 : 0.03,
          sizeAttenuation: true,
          transparent: true,
        }}
      />
    </points>
  );
};
