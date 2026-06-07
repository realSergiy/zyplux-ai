import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type Theme = 'dark' | 'light';

export const themeAtom = atomWithStorage<Theme>('totvibe-theme', 'dark');

export const shouldLoadSceneAtom = atom(false);

export const scrolledAtom = atom(false);

export const mountedAtom = atom(false);
export const showHintAtom = atom(false);

export const mousePositionAtom = atom({ x: 0, y: 0 });

export const isMobileAtom = atom(globalThis.window.innerWidth < 768 || 'ontouchstart' in globalThis);

export const isScrollingAtom = atom(false);

export const prefersReducedMotionAtom = atom(globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches);
