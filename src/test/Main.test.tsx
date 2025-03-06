import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Main from 'src/app/search';
import { vi } from 'vitest';

import { ThemeProvider } from '@/components/themeContext/ThemeProvider';
import { store } from '@/redux/store';

import { mockDetailsResponse, mockPeopleResponse } from './mock';

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  query: {},
  pathname: '/search',
  events: {
    on: vi.fn(),
    off: vi.fn(),
  },
};

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('Main', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should open detail view when a card is clicked', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main data={mockPeopleResponse} details={mockDetailsResponse} />
        </ThemeProvider>
      </Provider>
    );

    const card = await screen.findByText('Luke Skywalker');
    fireEvent.click(card);

    await waitFor(() => {
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
      <Provider store={store}>
        <ThemeProvider>
          <Main data={mockPeopleResponse} details={mockDetailsResponse} />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  // it('should display error message when both queries return errors', async () => {
  //   (useSearchPeopleQuery as Mock).mockReturnValue({
  //     isLoading: false,
  //     error: new Error('Error searching people'),
  //   });

  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <ThemeProvider>
  //           <Main />
  //         </ThemeProvider>
  //       </Provider>
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(/Something went wrong../i)).toBeInTheDocument();
  //   });
  // });

  it('should handle error when handleError is called', async () => {
    const originalErrorFunction = console.error;
    console.error = vi.fn();

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main data={mockPeopleResponse} details={mockDetailsResponse} />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Throw Error'));
    expect(screen.getByText(/Something went wrong../i)).toBeInTheDocument();

    console.error = originalErrorFunction;
  });

  it('should close detail view when close button is clicked', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main data={mockPeopleResponse} details={mockDetailsResponse} />
        </ThemeProvider>
      </Provider>
    );
    fireEvent.click(await screen.findByText('Luke Skywalker'));
    expect(screen.getAllByText('Luke Skywalker').length).toBe(2);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(screen.getAllByText('Luke Skywalker').length).toBe(1);
    });
  });
});
