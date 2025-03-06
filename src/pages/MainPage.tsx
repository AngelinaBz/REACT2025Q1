'use client';

import React, { useEffect, useState } from 'react';

import ErrorMessage from '@/components//errorBoundary/ErrorMessage';
import CardList from '@/components/cardList/CardList';
import DetailView from '@/components/detailView/DetailView';
import Loading from '@/components/loading/Loading';
import Pagination from '@/components/pagination/Pagination';
import { useTheme } from '@/components/themeContext/UseTheme';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setDetails } from '@/redux/slices/detailsSlice';
import { setPeople } from '@/redux/slices/peopleSlice';
import { DetailPersonResponse, PeopleResponse } from '@/utils/types';
import '@/styles/Main.module.css';

interface MainProps {
  data: PeopleResponse;
  details: DetailPersonResponse | null;
  initialPage: string;
}

const Main = ({ data, details, initialPage }: MainProps) => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const [hasError, setHasError] = useState<boolean>(false);
  const [detailedPerson, setDetailedPerson] = useState<string | null>(null);
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
      <div className={`app ${theme}`}>
        <div className="main-container">
          <div className="results-container" onClick={handleContainerClick}>
            {isLoadingMain && !detailedPerson ? (
              <Loading />
            ) : (
              <>
                <Pagination
                  currentPage={Number(initialPage)}
                  hasMore={totalCount > Number(initialPage) * 10}
                />
                <CardList people={people} onPersonClick={handlePersonClick} />
              </>
            )}
          </div>
          <div className="detailed-container">
            {detailedPerson ? <DetailView onClose={closeDetailView} /> : null}
          </div>
        </div>
      </div>
  );
};

export default Main;
