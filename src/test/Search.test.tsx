import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import Search from '@/components/search/Search';
import { ThemeProvider } from '@/components/themeContext/ThemeProvider';

const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('Search Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('should save the entered value to local storage when the Search button is clicked', () => {
    render(
      <ThemeProvider>
        <Search />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(window.localStorage.getItem('searchQuery')).toBe('test query');
  });

  it('should retrieve the value from local storage upon mounting', () => {
    mockLocalStorage.setItem('searchQuery', 'stored query');

    render(
      <ThemeProvider>
        <Search />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText('Search...');

    expect(input).toHaveValue('stored query');
  });

  it('should call onError when the Throw Error button is clicked', () => {
    render(
      <ThemeProvider>
        <Search />
      </ThemeProvider>
    );

    const throwErrorButton = screen.getByRole('button', {
      name: /throw error/i,
    });

    fireEvent.click(throwErrorButton);
  });
});
