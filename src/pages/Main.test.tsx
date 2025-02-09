import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import MainPage from './Main';
import { getAllPeople, searchPeople } from '../services/api';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../services/api');

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/search/i)).toBeInTheDocument();
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
        <MainPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('handles search and fetches people based on query', async () => {
    (searchPeople as Mock).mockResolvedValueOnce({
      results: [
        {
          name: 'Darth Vader',
          gender: 'male',
          url: 'https://swapi.dev/api/people/4/',
        },
      ],
      count: 1,
    });

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'Darth' },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });
  });

  it('handles errors when fetching data', async () => {
    (getAllPeople as Mock).mockRejectedValueOnce(new Error('not found'));

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong../i)).toBeInTheDocument();
    });
  });
});
