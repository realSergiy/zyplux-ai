import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { ParticleField } from './particle-field';
import { FloatingShapes } from './floating-shapes';
import { Suspense, useEffect } from 'react';
import { useAtom } from 'jotai';
import { mousePositionAtom } from '@/store/atoms';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import * as THREE from 'three';

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
      <Canvas
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
        frameloop='always'
      >
        <Suspense fallback={undefined}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <CameraController />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

          <ambientLight {...{ intensity: 0.5 }} />
          <directionalLight {...{ position: [10, 10, 5], intensity: 1 }} />
          <directionalLight {...{ position: [-10, -10, -5], intensity: 0.5 }} />

          <ParticleField />
          <FloatingShapes />

          {!shouldDisableEffects && (
            <EffectComposer>
              <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
              <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
              <Vignette eskil={false} offset={0.1} darkness={0.5} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
