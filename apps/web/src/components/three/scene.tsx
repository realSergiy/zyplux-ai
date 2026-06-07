import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import { useAtom } from 'jotai';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';

import { useIsMobile } from '@/hooks/use-is-mobile';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { mousePositionAtom } from '@/store/atoms';

import { FloatingShapes } from './floating-shapes';
import { ParticleField } from './particle-field';

const CameraController = () => {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useAtom(mousePositionAtom);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    globalThis.addEventListener('mousemove', handleMouseMove);
    return () => {
      globalThis.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, setMousePosition]);

  useFrame(() => {
    if (prefersReducedMotion) return;

    const targetX = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 0.5, 0.05);
    const targetY = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 0.5, 0.05);
    camera.position.set(targetX, targetY, camera.position.z);
    camera.lookAt(0, 0, 0);
  });

  return <></>;
};

export const Scene = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const shouldDisableEffects = isMobile || prefersReducedMotion;

  return (
    <div className='fixed inset-0 -z-10 bg-background'>
      <Canvas dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)} frameloop='always' performance={{ min: 0.5 }}>
        <Suspense fallback={undefined}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <CameraController />
          <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} />

          <ambientLight {...{ intensity: 0.5 }} />
          <directionalLight {...{ intensity: 1, position: [10, 10, 5] }} />
          <directionalLight {...{ intensity: 0.5, position: [-10, -10, -5] }} />

          <ParticleField />
          <FloatingShapes />

          {!shouldDisableEffects && (
            <EffectComposer>
              <Bloom intensity={0.8} luminanceSmoothing={0.9} luminanceThreshold={0.2} />
              <DepthOfField bokehScale={2} focalLength={0.02} focusDistance={0} height={480} />
              <Vignette darkness={0.5} eskil={false} offset={0.1} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
