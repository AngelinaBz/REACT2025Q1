import React, { useState } from 'react';
import Search from './components/search/Search';
import CardList from './components/cardList/CardList';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import ErrorMessage from './components/errorBoundary/ErrorMessage';
import { useSearchQuery } from './hooks/useSearchQuery';
import './App.css';

const App: React.FC = () => {
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

export default App;
