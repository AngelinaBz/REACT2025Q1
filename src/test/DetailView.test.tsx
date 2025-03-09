import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, afterEach, vi } from 'vitest';

import DetailView from '@/components/detailView/DetailView';
import { ThemeProvider } from '@/components/themeContext/ThemeProvider';
import { store } from '@/redux/store';
import { mockDetailsResponse } from 'src/test/mock';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('DetailView', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays person detail', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <DetailView details={mockDetailsResponse} />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/male/i)).toBeInTheDocument();
      expect(screen.getByText(/birth year: 19bby/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/close/i)).toBeInTheDocument();
  });
});
