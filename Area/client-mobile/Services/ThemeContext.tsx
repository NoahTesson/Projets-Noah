import { createContext } from 'react';

type Theme = 'light' | 'dark';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    urlBack: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext, Theme };