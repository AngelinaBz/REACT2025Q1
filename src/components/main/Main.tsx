import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import {
  useGetAllPeopleQuery,
  useSearchPeopleQuery,
} from '../../redux/slices/starWarsApi';
import CardList from '../cardList/CardList';
import DetailView from '../detailView/DetailView';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ErrorMessage from '../errorBoundary/ErrorMessage';
import Flyout from '../flyout/Flyout';
import Loading from '../loading/Loading';
import Pagination from '../pagination/Pagination';
import Search from '../search/Search';

import './Main.module.css';
import { useRouter } from 'next/router';
import { useTheme } from '@components/themeContext/UseTheme';

const MainPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useSearchQuery();
  const { theme } = useTheme();
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
    const params = new URLSearchParams();

    if (page !== undefined) {
      params.set('page', String(page));
    }

    if (detailedPerson) {
      params.set('details', detailedPerson);
    }

    router.replace({
      pathname: router.pathname,
      query: Object.fromEntries(params),
    });
  }, [page, detailedPerson]);

  if (hasError) {
    return <ErrorMessage onClose={closeErrorMessage} />;
  }

  return (
    <ErrorBoundary onError={handleError}>
      <div className={`app ${theme}`}>
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
      </div>
    </ErrorBoundary>
  );
};

export default MainPage;
