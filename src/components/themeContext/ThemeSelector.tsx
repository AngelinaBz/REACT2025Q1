import React from 'react';
import { useTheme } from './UseTheme';
import { Theme } from './ThemeContext';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <select
        value={theme}
        className={`button-${theme}`}
        onChange={(e) => setTheme(e.target.value as Theme)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
