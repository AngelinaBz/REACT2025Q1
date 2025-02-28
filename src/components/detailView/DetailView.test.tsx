import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, afterEach, vi, Mock } from 'vitest';

import { useFetchDetailPersonQuery } from '../../redux/slices/starWarsApi';
import { store } from '../../redux/store';
import { ThemeProvider } from '../themeContext/ThemeProvider';

import DetailView from './DetailView';

vi.mock(import('../../redux/slices/starWarsApi'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useFetchDetailPersonQuery: vi.fn(),
  };
});

describe('DetailView', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays loading indicator while fetching data', async () => {
    (useFetchDetailPersonQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { container } = render(
      <Provider store={store}>
        <ThemeProvider>
          <DetailView personId="1" onClose={vi.fn()} />
        </ThemeProvider>
      </Provider>
    );

    expect(container.querySelector('.loading')).toBeInTheDocument();
  });

  it('fetches and displays person detail', async () => {
    const mockPersonDetail = {
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
    };

    (useFetchDetailPersonQuery as Mock).mockReturnValueOnce({
      data: mockPersonDetail,
      isLoading: false,
      isError: false,
    });

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

  it('handles error during fetch', async () => {
    (useFetchDetailPersonQuery as Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <DetailView personId="1" onClose={vi.fn()} />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading detail/i)).toBeInTheDocument();
    });
  });
});
