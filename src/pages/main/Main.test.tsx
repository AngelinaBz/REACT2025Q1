import { render, screen, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import MainPage from './Main';
import { getAllPeople } from '../../services/api';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../services/api');

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
