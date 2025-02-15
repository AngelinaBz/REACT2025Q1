import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import MainPage from './Main';
import { getAllPeople, fetchDetailPerson } from '../../services/api';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

vi.mock('../../services/api');

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should open detail view when a card is clicked', async () => {
    (getAllPeople as Mock).mockResolvedValueOnce({
      results: [
        {
          name: 'Luke Skywalker',
          gender: 'male',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
      count: 1,
    });
    (fetchDetailPerson as Mock).mockResolvedValueOnce({
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
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
      expect(fetchDetailPerson).toHaveBeenCalledWith('1');
      expect(
        screen.getByRole('heading', { name: /Luke Skywalker/i })
      ).toBeInTheDocument();
    });
  });

  it('should trigger an API call to fetch detailed information when a card is clicked', async () => {
    (getAllPeople as Mock).mockResolvedValueOnce({
      results: [
        {
          name: 'Luke Skywalker',
          gender: 'male',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
      count: 1,
    });
    (fetchDetailPerson as Mock).mockResolvedValueOnce({
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
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
      expect(fetchDetailPerson).toHaveBeenCalledTimes(1);
      expect(fetchDetailPerson).toHaveBeenCalledWith('1');
    });
  });

  it('fetches and displays people when component mounts', async () => {
    (getAllPeople as Mock).mockResolvedValueOnce({
      results: [
        {
          name: 'Luke Skywalker',
          gender: 'male',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
      count: 1,
    });

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

  it('handles errors when fetching data', async () => {
    (getAllPeople as Mock).mockRejectedValueOnce(new Error('not found'));

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong../i)).toBeInTheDocument();
    });
  });

  it('should update URL query parameter when page changes', async () => {
    (getAllPeople as Mock).mockResolvedValueOnce({
      results: [
        {
          name: 'Test 1',
          gender: 'male',
          url: 'https://swapi.dev/api/people/1/',
        },
        {
          name: 'Test 2',
          gender: 'male',
          url: 'https://swapi.dev/api/people/2/',
        },
        {
          name: 'Test 3',
          gender: 'male',
          url: 'https://swapi.dev/api/people/3/',
        },
        {
          name: 'Test 4',
          gender: 'male',
          url: 'https://swapi.dev/api/people/4/',
        },
        {
          name: 'Test 5',
          gender: 'male',
          url: 'https://swapi.dev/api/people/5/',
        },
        {
          name: 'Test 6',
          gender: 'male',
          url: 'https://swapi.dev/api/people/6/',
        },
        {
          name: 'Test 7',
          gender: 'male',
          url: 'https://swapi.dev/api/people/7/',
        },
        {
          name: 'Test 8',
          gender: 'male',
          url: 'https://swapi.dev/api/people/8/',
        },
        {
          name: 'Test 9',
          gender: 'male',
          url: 'https://swapi.dev/api/people/9/',
        },
        {
          name: 'Test 10',
          gender: 'male',
          url: 'https://swapi.dev/api/people/10/',
        },
        {
          name: 'Test 11',
          gender: 'male',
          url: 'https://swapi.dev/api/people/11/',
        },
      ],
      count: 11,
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument();
      expect(screen.getByText('Test 2')).toBeInTheDocument();
    });

    expect(window.location.search).toBe('?page=1');

    fireEvent.click(screen.getByText(/Next/i));

    await waitFor(() => {
      expect(window.location.search).toBe('?page=2');
    });
  });
});
