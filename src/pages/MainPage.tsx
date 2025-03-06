'use client';

import React, { useEffect } from 'react';

import CardList from '@/components/cardList/CardList';
import DetailView from '@/components/detailView/DetailView';
import Loading from '@/components/loading/Loading';
import Pagination from '@/components/pagination/Pagination';
import { useTheme } from '@/components/themeContext/UseTheme';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
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
  const people = useAppSelector((state) => state.people.people);
  const totalCount = data.count || 0;
  const isLoadingMain = !data.results;

  useEffect(() => {
    if (data.results) {
      dispatch(setPeople(data.results));
    }
  }, [dispatch, data]);

  return (
    <div className={`app ${theme}`}>
      <div className="main-container">
        <div className="results-container">
          {isLoadingMain ? (
            <Loading />
          ) : (
            <>
              <Pagination
                currentPage={Number(initialPage)}
                hasMore={totalCount > Number(initialPage) * 10}
              />
              <CardList people={people} />
            </>
          )}
        </div>
        <div className="detailed-container">
          {details ? <DetailView details={details} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Main;
