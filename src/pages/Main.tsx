import React, { useState } from 'react';
import CardList from '../components/cardList/CardList';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import ErrorMessage from '../components/errorBoundary/ErrorMessage';
import Search from '../components/search/Search';
import { useSearchQuery } from '../hooks/useSearchQuery';
import Pagination from '../components/pagination/Pagination';

const MainPage: React.FC = () => {
  const [query, setQuery] = useSearchQuery();
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
  };

  const handleError = () => {
    try {
      throw new Error('Testing Error');
    } catch (error) {
      setHasError(true);
      console.error('Error caught in ErrorBoundary: ', error);
    }
  };

  const closeErrorMessage = () => {
    setHasError(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (hasError) {
    return <ErrorMessage onClose={closeErrorMessage} />;
  }

  return (
    <ErrorBoundary onError={handleError}>
      <Search onSearch={handleSearch} onError={handleError} />
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
      ></Pagination>
      <CardList query={query} page={page} />
    </ErrorBoundary>
  );
};

export default MainPage;
