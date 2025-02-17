import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelector from './ThemeSelector';
import { vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './UseTheme';

const TestComponent: React.FC = () => {
  const { theme } = useTheme();
  return <span>{theme}</span>;
};

describe('ThemeContext', () => {
  it('should have an initial light theme', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    expect(screen.getByRole('combobox')).toHaveValue('light');
  });

  it('should toggle theme between light and dark', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('light');
    fireEvent.change(select, { target: { value: 'dark' } });
    expect(select).toHaveValue('dark');

    fireEvent.change(select, { target: { value: 'light' } });
    expect(select).toHaveValue('light');
  });

  it('should use the context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('should throw an error when used outside of ThemeProvider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const renderTestComponent = () => render(<TestComponent />);

    expect(renderTestComponent).toThrow(
      'useTheme must be used within a ThemeProvider'
    );

    errorSpy.mockRestore();
  });
});
