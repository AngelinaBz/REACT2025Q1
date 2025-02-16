import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from '../themeContext/ThemeProvider';

const FailingComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders child components without crashing', () => {
    render(
      <ThemeProvider>
        <ErrorBoundary onError={() => {}}>
          <div>Working Component</div>
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Working Component')).toBeInTheDocument();
  });

  it('catches errors and renders ErrorMessage', () => {
    const mockOnError = vi.fn();

    render(
      <ThemeProvider>
        <ErrorBoundary onError={mockOnError}>
          <FailingComponent />
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Something went wrong..')).toBeInTheDocument();
    expect(mockOnError).toHaveBeenCalled();
  });
});
