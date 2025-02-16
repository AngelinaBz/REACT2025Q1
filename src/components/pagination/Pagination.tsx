import React from 'react';
import './Pagination.css';
import { useTheme } from '../themeContext/UseTheme';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  hasMore,
}) => {
  const { theme } = useTheme();
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className={`button-${theme}`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>Page {currentPage}</span>
      <button
        className={`button-${theme}`}
        onClick={handleNextPage}
        disabled={!hasMore}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
