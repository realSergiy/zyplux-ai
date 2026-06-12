export const PALETTE = {
  accent: '#58a6ff',
  background: '#0d1117',
  border: '#30363d',
  foreground: '#c9d1d9',
  grid: '#6e7681',
  heading: '#f0f6fc',
  muted: '#8b949e',
  success: '#3fb950',
  surface: '#161b22',
  violet: '#bc8cff',
  warning: '#d29922',
} as const;

export const toRgba = (hex: string, alpha: number) => {
  const channels = [1, 3, 5].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16));
  return `rgba(${channels.join(',')},${String(alpha)})`;
};
