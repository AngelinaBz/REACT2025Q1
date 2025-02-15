import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import DetailView from './DetailView';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';

describe('DetailView', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays loading indicator while fetching data', async () => {
    const { container } = render(
      <Provider store={store}>
        <DetailView personId="1" onClose={vi.fn()} />
      </Provider>
    );

    expect(container.querySelector('.loading')).toBeInTheDocument();
    await waitFor(() => {
      expect(container.querySelector('.loading')).not.toBeInTheDocument();
    });
  });

  // it('ensures clicking the close button hides the component', async () => {
  //   const mockPerson = {
  //     name: 'Luke Skywalker',
  //     gender: 'male',
  //     birth_year: '19BBY',
  //   };

  //   (fetchDetailPerson as Mock).mockResolvedValueOnce(mockPerson);

  //   const handleClose = vi.fn();
  //   render(<DetailView personId="1" onClose={handleClose} />);
  //   await waitFor(() => {
  //     expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  //   });

  //   screen.getByText(/close/i).click();

  //   expect(handleClose).toHaveBeenCalled();
  // });

  // it('fetches and displays person detail', async () => {
  //   const mockPerson = {
  //     name: 'Luke Skywalker',
  //     gender: 'male',
  //     birth_year: '19BBY',
  //   };
  //   (fetchDetailPerson as Mock).mockResolvedValueOnce(mockPerson);

  //   const { container } = render(<DetailView personId="1" onClose={vi.fn()} />);

  //   const loadingElement = container.querySelector('.loading');
  //   expect(loadingElement).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  //     expect(screen.getByText(/male/i)).toBeInTheDocument();
  //     expect(screen.getByText(/birth year: 19bby/i)).toBeInTheDocument();
  //     const img = screen.getByRole('img', { name: /luke skywalker/i });
  //     expect(img).toBeInTheDocument();
  //     expect(img).toHaveAttribute(
  //       'src',
  //       'https://starwars-visualguide.com/assets/img/characters/1.jpg'
  //     );
  //   });

  //   expect(screen.getByText(/close/i)).toBeInTheDocument();
  // });

  // it('handles error during fetch', async () => {
  //   (fetchDetailPerson as Mock).mockRejectedValueOnce(new Error('not found'));

  //   render(<DetailView personId="1" onClose={vi.fn()} />);

  //   await waitFor(() => {
  //     expect(screen.getByText(/error loading detail/i)).toBeInTheDocument();
  //   });
  // });
});
