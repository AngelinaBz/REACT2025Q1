import { Theme } from '@/utils/types';

import { useTheme } from './UseTheme';

const ThemeSelector = () => {
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
