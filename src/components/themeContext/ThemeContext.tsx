import { createContext } from 'react';

import { Theme } from '@/utils/types';

interface ThemeContextProps {
  theme: Theme;
  setTheme(theme: Theme): void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);
