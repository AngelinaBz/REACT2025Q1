import React, { useEffect, useState } from 'react';
import CardList from '../components/cardList/CardList';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import ErrorMessage from '../components/errorBoundary/ErrorMessage';
import Search from '../components/search/Search';
import { useSearchQuery } from '../hooks/useSearchQuery';
import Pagination from '../components/pagination/Pagination';
import { getAllPeople, searchPeople } from '../services/api';
import Loading from '../components/loading/Loading';
import { Person } from '../utils/interfaces';
import { useSearchParams } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useSearchQuery();
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const loadFilms = async (query: string, page: number) => {
    setIsLoading(true);
    let data;
    try {
      if (query) {
        data = await searchPeople(query, page);
      } else {
        data = await getAllPeople(page);
      }
      setPeople(data.results);
      setTotalCount(data.count);
      setHasError(false);
    } catch (error) {
      console.error('Error loading people:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilms(query, page);
  }, [query, page]);

  useEffect(() => {
    setSearchParams({
      ...(page !== undefined && { page: String(page) }),
    });
  }, [page, setSearchParams, query]);

  if (hasError) {
    return <ErrorMessage onClose={closeErrorMessage} />;
  }

  return (
    <ErrorBoundary onError={handleError}>
      <Search onSearch={handleSearch} onError={handleError} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            hasMore={totalCount > page * 10}
          />
          <CardList people={people} />
        </>
      )}
    </ErrorBoundary>
  );
};

export default MainPage;
