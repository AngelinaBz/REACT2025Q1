import React from 'react';
import { useTheme } from './UseTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button className={`button-${theme}`} onClick={toggleTheme}>
        {theme === 'light' ? 'Dark' : 'Light'} theme
      </button>
    </div>
  );
};

export default ThemeToggle;
