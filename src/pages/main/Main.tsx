import React, { useEffect, useState } from 'react';
import CardList from '../../components/cardList/CardList';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import ErrorMessage from '../../components/errorBoundary/ErrorMessage';
import Search from '../../components/search/Search';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import Pagination from '../../components/pagination/Pagination';
import Loading from '../../components/loading/Loading';
import { useSearchParams } from 'react-router-dom';
import DetailView from '../../components/detailView/DetailView';
import {
  useGetAllPeopleQuery,
  useSearchPeopleQuery,
} from '../../redux/slices/starWarsApi';
import { useAppSelector } from '../../hooks/useAppSelector';
import Flyout from '../../components/flyout/Flyout';
import './Main.css';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useSearchQuery();
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const [detailedPerson, setDetailedPerson] = useState<string | null>(null);
  const selectedPeople = useAppSelector(
    (state) => state.selected.selectedPeople
  );
  const {
    data: allPeopleData,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useGetAllPeopleQuery(page);
  const {
    data: searchPeopleData,
    isLoading: isLoadingSearch,
    error: errorSearch,
  } = useSearchPeopleQuery({ query, page }, { skip: !query });

  useEffect(() => {
    if (errorAll || errorSearch) {
      setHasError(true);
    }
  }, [errorAll, errorSearch]);

  const people = query ? searchPeopleData?.results : allPeopleData?.results;
  const totalCount = query
    ? searchPeopleData?.count || 0
    : allPeopleData?.count || 0;
  const isLoading = isLoadingAll || isLoadingSearch;

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
    closeDetailView();
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

  const handlePersonClick = (url: string) => {
    const id = url.match(/\/(\d+)\//)?.[1];
    if (id) {
      setDetailedPerson(id);
    }
  };

  const handleContainerClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.card-container')) {
      closeDetailView();
    }
  };

  const closeDetailView = () => setDetailedPerson(null);

  useEffect(() => {
    const params = {
      ...(page !== undefined && { page: String(page) }),
      ...(detailedPerson && { details: detailedPerson }),
    };

    setSearchParams(params);
  }, [page, detailedPerson, setSearchParams]);

  if (hasError) {
    return <ErrorMessage onClose={closeErrorMessage} />;
  }

  return (
    <ErrorBoundary onError={handleError}>
      <Search onSearch={handleSearch} onError={handleError} />
      <div className="main-container">
        <div className="results-container" onClick={handleContainerClick}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Pagination
                currentPage={page}
                onPageChange={handlePageChange}
                hasMore={totalCount > page * 10}
              />
              <CardList
                people={people || []}
                onPersonClick={handlePersonClick}
              />
            </>
          )}
        </div>
        <div className="detailed-container">
          {detailedPerson ? (
            <DetailView personId={detailedPerson} onClose={closeDetailView} />
          ) : null}
        </div>
      </div>
      {selectedPeople.length > 0 && <Flyout />}
    </ErrorBoundary>
  );
};

export default MainPage;
