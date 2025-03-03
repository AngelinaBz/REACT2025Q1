import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
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
import { wrapper } from '@/redux/store';
import { DetailPersonResponse, PeopleResponse } from '@/utils/types';
import '@/styles/Main.module.css';

interface MainProps {
  data: PeopleResponse;
  details: DetailPersonResponse | null;
}

const Main = ({ data, details }: MainProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
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
  const people = useAppSelector((state) => state.people.people);
  const totalCount = data.count || 0;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (data.results) {
      dispatch(setPeople(data.results));
    }
    if (details) {
      dispatch(setDetails(details));
    }
  }, [dispatch, data, details, router]);

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

  const closeDetailView = () => {
    setDetailedPerson(null);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (page !== undefined) {
      params.set('page', String(page));
    }
    if (query) {
      params.set('q', query);
    }
    if (detailedPerson) {
      params.set('details', detailedPerson);
    }
    router.replace({
      pathname: router.pathname,
      query: Object.fromEntries(params),
    });
  }, [query, page, detailedPerson]);

  useEffect(() => {
    const routeStart = () => setLoading(true);
    const routeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', routeStart);
    router.events.on('routeChangeComplete', routeComplete);

    return () => {
      router.events.off('routeChangeStart', routeStart);
      router.events.off('routeChangeComplete', routeComplete);
    };
  }, [router]);

  if (hasError) {
    return <ErrorMessage onClose={closeErrorMessage} />;
  }

  return (
    <ErrorBoundary onError={handleError}>
      <div className={`app ${theme}`}>
        <Search onSearch={handleSearch} onError={handleError} />
        <div className="main-container">
          <div className="results-container" onClick={handleContainerClick}>
            {isLoading && !detailedPerson ? (
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    const query = context.query.q || '';
    const page = context.query.page || 1;
    const details = context.query.details;
    const res = await fetch(
      `https://swapi.dev/api/people/?search=${query}&page=${page}`
    );
    const data: PeopleResponse = await res.json();
    let dataDetailes = null;
    if (details) {
      const resDetailes = await fetch(
        `https://swapi.dev/api/people/${details}/`
      );
      dataDetailes = await resDetailes.json();
    }
    return { props: { data, details: dataDetailes } };
  }
);

export default Main;
