import { useTheme } from '../themeContext/UseTheme';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  onPageChange(page: number): void;
  hasMore: boolean;
}

const Pagination = ({
  currentPage,
  onPageChange,
  hasMore,
}: PaginationProps) => {
  const { theme } = useTheme();

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
