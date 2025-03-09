import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import { ThemeProvider } from '@/components/themeContext/ThemeProvider';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('ErrorBoundary', () => {
  it('renders child components without crashing', () => {
    render(
      <ThemeProvider>
        <ErrorBoundary>
          <div>Working Component</div>
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Working Component')).toBeInTheDocument();
  });
});
