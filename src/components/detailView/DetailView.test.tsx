import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import DetailView from './DetailView';
import { fetchDetailPerson } from '../../services/api';

vi.mock('../../services/api', () => ({
  fetchDetailPerson: vi.fn(),
}));

describe('DetailView', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays person detail', async () => {
    const mockPerson = {
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
    };
    (fetchDetailPerson as jest.Mock).mockResolvedValueOnce(mockPerson);

    const { container } = render(<DetailView personId="1" onClose={vi.fn()} />);

    const loadingElement = container.querySelector('.loading');
    expect(loadingElement).toBeInTheDocument();

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
    (fetchDetailPerson as jest.Mock).mockRejectedValueOnce(
      new Error('not found')
    );

    render(<DetailView personId="1" onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/error loading detail/i)).toBeInTheDocument();
    });
  });
});
