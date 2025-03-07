import React from 'react';

import CardList from '@/components/cardList/CardList';
import Pagination from '@/components/pagination/Pagination';
import '@/styles/Main.module.css';
import { fetchPeople } from '@/utils/api';

import DetailedPage from './DetailPage';

interface MainProps {
  initialQuery: string;
  detailId: string;
  initialPage: string;
}

const Main = async ({ initialQuery, detailId, initialPage }: MainProps) => {
  const data = await fetchPeople(initialQuery, +initialPage);
  const totalCount = data.count || 0;

  return (
    <>
      <div className="results-container">
        <>
          <Pagination
            currentPage={Number(initialPage)}
            hasMore={totalCount > Number(initialPage) * 10}
          />
          <CardList people={data.results} />
        </>
      </div>
      <div className="detailed-container">
        {!!detailId && <DetailedPage detailId={detailId} />}
      </div>
    </>
  );
};

export default Main;
