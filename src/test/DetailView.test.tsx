import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockDetailsResponse } from 'src/test/mock';
import { describe, it, expect, afterEach, vi } from 'vitest';

import DetailView from '@/components/detailView/DetailView';
import { ThemeProvider } from '@/components/themeContext/ThemeProvider';
import { setDetails } from '@/redux/slices/detailsSlice';
import { store } from '@/redux/store';

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  query: {},
  pathname: '/search',
  events: {
    on: vi.fn(),
    off: vi.fn(),
  },
};

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('DetailView', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // it('displays loading indicator while fetching data', async () => {
  //   const { container } = render(
  //     <Provider store={store}>
  //       <ThemeProvider>
  //         <DetailView personId="1" onClose={vi.fn()} />
  //       </ThemeProvider>
  //     </Provider>
  //   );

  //   expect(container.querySelector('.loading')).toBeInTheDocument();
  // });

  it('fetches and displays person detail', async () => {
    store.dispatch(setDetails(mockDetailsResponse));

    render(
      <Provider store={store}>
        <ThemeProvider>
          <DetailView personId="1" onClose={vi.fn()} />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/male/i)).toBeInTheDocument();
      expect(screen.getByText(/birth year: 19bby/i)).toBeInTheDocument();
      const img = screen.getByRole('img', { name: /luke skywalker/i });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute(
        'src',
        'https://starwars-visualguide.com/assets/img/characters/1.jpg'
      );
    });

    expect(screen.getByText(/close/i)).toBeInTheDocument();
  });

  // it('handles error during fetch', async () => {
  //   render(
  //     <Provider store={store}>
  //       <ThemeProvider>
  //         <DetailView personId="1" onClose={vi.fn()} />
  //       </ThemeProvider>
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(/error loading detail/i)).toBeInTheDocument();
  //   });
  // });
});
