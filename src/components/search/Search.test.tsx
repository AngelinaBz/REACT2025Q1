import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Search from './Search';

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

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('Search Component', () => {
  const onSearchMock = vi.fn();
  const onErrorMock = vi.fn();

  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('should save the entered value to local storage when the Search button is clicked', () => {
    render(<Search onSearch={onSearchMock} onError={onErrorMock} />);

    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(window.localStorage.getItem('searchQuery')).toBe('test query');
    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('should retrieve the value from local storage upon mounting', () => {
    mockLocalStorage.setItem('searchQuery', 'stored query');

    render(<Search onSearch={onSearchMock} onError={onErrorMock} />);

    const input = screen.getByPlaceholderText('Search...');

    expect(input).toHaveValue('stored query');
  });

  it('should call onError when the Throw Error button is clicked', () => {
    render(<Search onSearch={onSearchMock} onError={onErrorMock} />);

    const throwErrorButton = screen.getByRole('button', {
      name: /throw error/i,
    });

    fireEvent.click(throwErrorButton);

    expect(onErrorMock).toHaveBeenCalled();
  });
});
