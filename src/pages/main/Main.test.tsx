import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { vi, Mock } from 'vitest';

import { ThemeProvider } from '../../components/themeContext/ThemeProvider';
import {
  useGetAllPeopleQuery,
  useSearchPeopleQuery,
  useFetchDetailPersonQuery,
} from '../../redux/slices/starWarsApi';
import { store } from '../../redux/store';

import MainPage from './Main';

vi.mock(import('../../redux/slices/starWarsApi'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetAllPeopleQuery: vi.fn(),
    useFetchDetailPersonQuery: vi.fn(),
    useSearchPeopleQuery: vi.fn(),
  };
});

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useGetAllPeopleQuery as Mock).mockReturnValue({
      data: {
        results: [
          {
            name: 'Luke Skywalker',
            gender: 'male',
            url: 'https://swapi.dev/api/people/1/',
          },
        ],
        count: 1,
      },
      isLoading: false,
      isError: false,
    });

    (useFetchDetailPersonQuery as Mock).mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
      },
      isLoading: false,
      isError: false,
    });

    (useSearchPeopleQuery as Mock).mockReturnValue({
      data: {
        results: [],
      },
      isLoading: false,
      isError: false,
    });
  });

  it('should open detail view when a card is clicked', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const card = await screen.findByText('Luke Skywalker');
    fireEvent.click(card);

    await waitFor(() => {
      expect(useFetchDetailPersonQuery).toHaveBeenCalledWith('1');
      const headings = screen.getAllByRole('heading', {
        name: 'Luke Skywalker',
      });
      expect(headings.length).toBe(2);
      expect(headings[0]).toBeInTheDocument();
      expect(headings[1]).toBeInTheDocument();
    });
  });

  it('fetches and displays people when component mounts', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('should display loading indicator when data is loading', () => {
    (useGetAllPeopleQuery as Mock).mockReturnValue({
      isLoading: true,
    });

    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const loadingIndicator = container.querySelector('.loading');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('should display error message when both queries return errors', async () => {
    (useSearchPeopleQuery as Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Error searching people'),
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong../i)).toBeInTheDocument();
    });
  });

  it('should handle error when handleError is called', async () => {
    const originalErrorFunction = console.error;
    console.error = vi.fn();

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Throw Error'));
    expect(screen.getByText(/Something went wrong../i)).toBeInTheDocument();

    console.error = originalErrorFunction;
  });

  it('should close detail view when close button is clicked', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
    fireEvent.click(await screen.findByText('Luke Skywalker'));
    expect(screen.getAllByText('Luke Skywalker').length).toBe(2);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(screen.getAllByText('Luke Skywalker').length).toBe(1);
    });
  });
});
