import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, it, expect, vi } from 'vitest';

import Pagination from '@/components/pagination/Pagination';
import { ThemeProvider } from '@/components/themeContext/ThemeProvider';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    toString: () => 'page=1',
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Pagination Component', () => {
  it('should render current page correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Pagination currentPage={1} hasMore={true} />
      </ThemeProvider>
    );
    expect(getByText('Page 1')).toBeInTheDocument();
  });

  it('Prev button should be disabled on the first page', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Pagination currentPage={1} hasMore={true} />
      </ThemeProvider>
    );

    const prevButton = getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  it('Next button should be disabled when hasMore is false', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Pagination currentPage={1} hasMore={false} />
      </ThemeProvider>
    );

    const nextButton = getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should not call router.push when Prev button is clicked on the first page', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Pagination currentPage={1} hasMore={true} />
      </ThemeProvider>
    );

    const prevButton = getByText('Prev');
    fireEvent.click(prevButton);

    const pushMock = vi.mocked(useRouter().push);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('should not call router.push when Next button is clicked and hasMore is false', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Pagination currentPage={1} hasMore={false} />
      </ThemeProvider>
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    const pushMock = vi.mocked(useRouter().push);
    expect(pushMock).not.toHaveBeenCalled();
  });
});
