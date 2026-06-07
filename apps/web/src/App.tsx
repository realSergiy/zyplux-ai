import { lazy, Suspense, useEffect } from 'react';
import { useAtom } from 'jotai';
import { shouldLoadSceneAtom, themeAtom } from './store/atoms';
import { Navigation } from './components/layout/navigation';
import { Hero } from './components/sections/hero';
import { Footer } from './components/sections/footer';
import { SceneLoader } from './components/three/scene-loader';

const Scene = lazy(() => import('./components/three/scene').then(module => ({ default: module.Scene })));
const Features = lazy(() => import('./components/sections/features').then(module => ({ default: module.Features })));

const App = () => {
  const [shouldLoadScene, setShouldLoadScene] = useAtom(shouldLoadSceneAtom);
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadScene(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [setShouldLoadScene]);

  useEffect(() => {
    const root = globalThis.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <a href='#main-content' className='skip-link'>
        Skip to main content
      </a>
      {shouldLoadScene && (
        <Suspense fallback={<SceneLoader />}>
          <Scene />
        </Suspense>
      )}
      <Navigation />
      <main id='main-content'>
        <div className='relative'>
          <Hero />
          <div className='absolute bottom-0 left-0 right-0 h-64 pointer-events-none'>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent opacity-60' />
          </div>
        </div>
        <Suspense fallback={<div className='h-screen' />}>
          <Features />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
