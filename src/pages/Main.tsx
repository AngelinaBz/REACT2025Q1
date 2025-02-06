import React, { useState } from 'react';
import CardList from '../components/cardList/CardList';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import ErrorMessage from '../components/errorBoundary/ErrorMessage';
import Search from '../components/search/Search';
import { useSearchQuery } from '../hooks/useSearchQuery';

const MainPage: React.FC = () => {
  const [query, setQuery] = useSearchQuery();
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setQuery(query);
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

  if (hasError) {
    return <ErrorMessage onClose={closeErrorMessage} />;
  }

  return (
    <ErrorBoundary onError={handleError}>
      <Search onSearch={handleSearch} onError={handleError} />
      <CardList query={query} />
    </ErrorBoundary>
  );
};

export default MainPage;
