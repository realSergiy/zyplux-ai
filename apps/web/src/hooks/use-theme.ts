import { useAtom } from 'jotai';
import { themeAtom } from '@/store/atoms';

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return {
    theme,
    setTheme,
  };
};
