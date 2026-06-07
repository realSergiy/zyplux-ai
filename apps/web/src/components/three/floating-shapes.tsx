import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useTheme } from '@/hooks/use-theme';

const generateShapes = (count: number) => {
  return Array.from({ length: count }, () => ({
    scale: 0.2 + Math.random() * 0.6,
    orbitRadius: 3 + Math.random() * 10,
    phiOffset: Math.random() * Math.PI * 2,
    thetaOffset: Math.random() * Math.PI * 2,
    phiSpeed: (Math.random() - 0.5) * 0.3,
    thetaSpeed: (Math.random() - 0.5) * 0.3,
    initialRotationX: Math.random() * Math.PI * 2,
    initialRotationY: Math.random() * Math.PI * 2,
  }));
};

const FloatingShape = ({
  scale,
  shouldAnimate,
  orbitRadius,
  phiOffset,
  thetaOffset,
  phiSpeed,
  thetaSpeed,
  initialRotationX,
  initialRotationY,
}: {
  scale: number;
  shouldAnimate: boolean;
  theme: string | undefined;
  orbitRadius: number;
  phiOffset: number;
  thetaOffset: number;
  phiSpeed: number;
  thetaSpeed: number;
  initialRotationX: number;
  initialRotationY: number;
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
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} scale={scale}>
          <icosahedronGeometry {...{ args: [1, 1] }} />
          {
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              chromaticAberration={0.5}
              anisotropy={0.3}
              distortion={0.3}
              distortionScale={0.2}
              temporalDistortion={0.1}
              iridescence={1}
              iridescenceIOR={1}
              iridescenceThicknessRange={[0, 1400]}
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

  const stableShapes = useMemo(() => {
    return shapes.slice(0, shapeCount);
  }, [shapes, shapeCount]);

  return (
    <>
      {stableShapes.map((shape, i) => (
        <FloatingShape
          key={i}
          scale={shape.scale}
          orbitRadius={shape.orbitRadius}
          phiOffset={shape.phiOffset}
          thetaOffset={shape.thetaOffset}
          phiSpeed={shape.phiSpeed}
          thetaSpeed={shape.thetaSpeed}
          initialRotationX={shape.initialRotationX}
          initialRotationY={shape.initialRotationY}
          shouldAnimate={shouldAnimate}
          theme={theme}
        />
      ))}
    </>
  );
};
