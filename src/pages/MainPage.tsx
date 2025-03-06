'use client';

import React, { useEffect, useState } from 'react';

import ErrorMessage from '@/components//errorBoundary/ErrorMessage';
import CardList from '@/components/cardList/CardList';
import DetailView from '@/components/detailView/DetailView';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import Flyout from '@/components/flyout/Flyout';
import Loading from '@/components/loading/Loading';
import Pagination from '@/components/pagination/Pagination';
import Search from '@/components/search/Search';
import { useTheme } from '@/components/themeContext/UseTheme';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { setDetails } from '@/redux/slices/detailsSlice';
import { setPeople } from '@/redux/slices/peopleSlice';
import { DetailPersonResponse, PeopleResponse } from '@/utils/types';
import '@/styles/Main.module.css';

interface MainProps {
  data: PeopleResponse;
  details: DetailPersonResponse | null;
  initialQuery: string;
  initialPage: string;
}

const Main = ({ data, details, initialQuery, initialPage }: MainProps) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchQuery();
  const { theme } = useTheme();
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(Number(initialPage));
  const [detailedPerson, setDetailedPerson] = useState<string | null>(null);
  const selectedPeople = useAppSelector(
    (state) => state.selected.selectedPeople
  );
  const people = useAppSelector((state) => state.people.people);
  const totalCount = data.count || 0;
  const isLoadingMain = !data.results;

  useEffect(() => {
    if (data.results) {
      dispatch(setPeople(data.results));
    }
    if (details) {
      dispatch(setDetails(details));
    }
  }, [dispatch, data, details]);

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

  const closeDetailView = () => {
    setDetailedPerson(null);
  };

  if (hasError) {
    return <ErrorMessage onClose={closeErrorMessage} />;
  }

  return (
    <ErrorBoundary>
      <div className={`app ${theme}`}>
        <Search />
        <div className="main-container">
          <div className="results-container" onClick={handleContainerClick}>
            {isLoadingMain && !detailedPerson ? (
              <Loading />
            ) : (
              <>
                <Pagination
                  currentPage={page}
                  onPageChange={handlePageChange}
                  hasMore={totalCount > page * 10}
                />
                <CardList people={people} onPersonClick={handlePersonClick} />
              </>
            )}
          </div>
          <div className="detailed-container">
            {detailedPerson ? <DetailView onClose={closeDetailView} /> : null}
          </div>
        </div>
        {selectedPeople.length > 0 && <Flyout />}
      </div>
    </ErrorBoundary>
  );
};

export default Main;
