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

    expect(screen.getByRole('button')).toHaveTextContent('Dark theme');
  });

  it('should toggle theme between light and dark', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Dark theme');

    fireEvent.click(button);

    expect(button).toHaveTextContent('Light theme');
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
