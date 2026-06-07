import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import { useIsMobile } from '@/hooks/use-is-mobile';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useTheme } from '@/hooks/use-theme';

const generateShapes = (count: number) =>
  Array.from({ length: count }, () => ({
    initialRotationX: Math.random() * Math.PI * 2,
    initialRotationY: Math.random() * Math.PI * 2,
    orbitRadius: 3 + Math.random() * 10,
    phiOffset: Math.random() * Math.PI * 2,
    phiSpeed: (Math.random() - 0.5) * 0.3,
    scale: 0.2 + Math.random() * 0.6,
    thetaOffset: Math.random() * Math.PI * 2,
    thetaSpeed: (Math.random() - 0.5) * 0.3,
  }));

const FloatingShape = ({
  initialRotationX,
  initialRotationY,
  orbitRadius,
  phiOffset,
  phiSpeed,
  scale,
  shouldAnimate,
  thetaOffset,
  thetaSpeed,
}: {
  initialRotationX: number;
  initialRotationY: number;
  orbitRadius: number;
  phiOffset: number;
  phiSpeed: number;
  scale: number;
  shouldAnimate: boolean;
  theme: string | undefined;
  thetaOffset: number;
  thetaSpeed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = initialRotationX;
      meshRef.current.rotation.y = initialRotationY;
    }
  }, [initialRotationX, initialRotationY]);

  useFrame(state => {
    if (!meshRef.current || !groupRef.current) return;

    if (shouldAnimate) {
      const time = state.clock.getElapsedTime();
      const rotSpeed = 0.15;

      meshRef.current.rotation.x = time * rotSpeed;
      meshRef.current.rotation.y = time * (rotSpeed * 0.67);

      const phi = time * phiSpeed + phiOffset;
      const theta = time * thetaSpeed + thetaOffset;

      groupRef.current.position.x = orbitRadius * Math.sin(phi) * Math.cos(theta);
      groupRef.current.position.y = orbitRadius * Math.sin(phi) * Math.sin(theta);
      groupRef.current.position.z = orbitRadius * Math.cos(phi) - 20;
    }
  });

  return (
    <group ref={groupRef}>
      <Float floatIntensity={1} rotationIntensity={0.5} speed={1}>
        <mesh ref={meshRef} scale={scale}>
          <icosahedronGeometry {...{ args: [1, 1] }} />
          {
            <MeshTransmissionMaterial
              anisotropy={0.3}
              backside
              chromaticAberration={0.5}
              distortion={0.3}
              distortionScale={0.2}
              iridescence={1}
              iridescenceIOR={1}
              iridescenceThicknessRange={[0, 1400]}
              samples={4}
              temporalDistortion={0.1}
              thickness={0.5}
            />
          }
        </mesh>
      </Float>
    </group>
  );
};

export const FloatingShapes = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  const shouldAnimate = !prefersReducedMotion;
  const shapeCount = isMobile ? 3 : 5;

  const [shapes] = useState(() => generateShapes(shapeCount));

  const stableShapes = useMemo(() => shapes.slice(0, shapeCount), [shapes, shapeCount]);

  return (
    <>
      {stableShapes.map((shape, i) => (
        <FloatingShape
          initialRotationX={shape.initialRotationX}
          initialRotationY={shape.initialRotationY}
          key={i}
          orbitRadius={shape.orbitRadius}
          phiOffset={shape.phiOffset}
          phiSpeed={shape.phiSpeed}
          scale={shape.scale}
          shouldAnimate={shouldAnimate}
          theme={theme}
          thetaOffset={shape.thetaOffset}
          thetaSpeed={shape.thetaSpeed}
        />
      ))}
    </>
  );
};
