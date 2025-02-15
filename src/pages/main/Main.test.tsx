import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import MainPage from './Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import {
  useGetAllPeopleQuery,
  useSearchPeopleQuery,
  useFetchDetailPersonQuery,
} from '../../redux/slices/api';

interface ApiModule {
  useGetAllPeopleQuery: typeof useGetAllPeopleQuery;
  useSearchPeopleQuery: typeof useSearchPeopleQuery;
  useFetchDetailPersonQuery: typeof useFetchDetailPersonQuery;
}

vi.mock('../../redux/slices/api', async (importOriginal) => {
  const actual: ApiModule = (await importOriginal()) as ApiModule;
  return {
    ...actual,
    useGetAllPeopleQuery: vi.fn().mockImplementation(() => ({
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
    })),
    useFetchDetailPersonQuery: vi.fn(() => ({
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
    })),
    useSearchPeopleQuery: vi.fn().mockImplementation(() => ({
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
    })),
  };
});

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should open detail view when a card is clicked', async () => {
    (useGetAllPeopleQuery as Mock).mockReturnValueOnce({
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

    (useFetchDetailPersonQuery as Mock).mockReturnValueOnce({
      data: {
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
      },
      isLoading: false,
      isError: false,
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    const card = await screen.findByText('Luke Skywalker');
    fireEvent.click(card);

    await waitFor(() => {
      expect(useFetchDetailPersonQuery).toHaveBeenCalledWith('1');
      expect(
        screen.getByRole('heading', { name: /Luke Skywalker/i })
      ).toBeInTheDocument();
    });
  });

  it('fetches and displays people when component mounts', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });
});
