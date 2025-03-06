import { ReactNode, Suspense } from 'react';

import { fetchDetails, fetchPeople } from '@/utils/api';
import Main from 'src/pages/MainPage';

import LoadingFallback from './loading';
import Search from '@/components/search/Search';
import Flyout from '@/components/flyout/Flyout';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; id?: string }>;
}): Promise<ReactNode> {
  const { query = '', page = '1', id } = await searchParams;
  const data = await fetchPeople(query, +page);
  let dataDetails = null;

  if (id) {
    dataDetails = await fetchDetails(id);
  }

  return (
    <>
      <Search />
      <Suspense fallback={<LoadingFallback />}>
        <Main data={data} initialPage={page} details={dataDetails} />;
      </Suspense>
      <Flyout />
    </>
  );
}
