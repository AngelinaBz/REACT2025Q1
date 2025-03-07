'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useTheme } from '../themeContext/UseTheme';
import './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
}

const Pagination = ({ currentPage, hasMore }: PaginationProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', page.toString());
    router.push(`/search/pages?${params.toString()}`);
  };

  return (
    <div className="pagination">
      <button
        className={`button-${theme}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </button>
      <span>Page {currentPage}</span>
      <button
        className={`button-${theme}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
