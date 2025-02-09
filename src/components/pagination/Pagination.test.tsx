import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  let onPageChangeMock: (page: number) => void;

  beforeEach(() => {
    onPageChangeMock = vi.fn();
  });

  it('should render current page correctly', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChangeMock}
        hasMore={true}
      />
    );
    expect(getByText('Page 1')).toBeInTheDocument();
  });

  it('should call onPageChange with previous page number when Prev button is clicked', () => {
    const { getByText } = render(
      <Pagination
        currentPage={2}
        onPageChange={onPageChangeMock}
        hasMore={true}
      />
    );

    fireEvent.click(getByText('Prev'));

    expect(onPageChangeMock).toHaveBeenCalledWith(1);
    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
  });

  it('should call onPageChange with next page number when Next button is clicked', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChangeMock}
        hasMore={true}
      />
    );

    fireEvent.click(getByText('Next'));

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
  });

  it('Prev button should be disabled on the first page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChangeMock}
        hasMore={true}
      />
    );

    const prevButton = getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  it('Next button should be disabled when hasMore is false', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChangeMock}
        hasMore={false}
      />
    );

    const nextButton = getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should not call onPageChange when Prev button is clicked on the first page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChangeMock}
        hasMore={true}
      />
    );

    fireEvent.click(getByText('Prev'));

    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('should not call onPageChange when Next button is clicked and hasMore is false', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChangeMock}
        hasMore={false}
      />
    );

    fireEvent.click(getByText('Next'));

    expect(onPageChangeMock).not.toHaveBeenCalled();
  });
});
