import { ReactNode, Suspense } from 'react';

import { fetchPeople, fetchDetails } from '@/utils/api';
import { DetailPersonResponse } from '@/utils/types';
import Main from 'src/pages/MainPage';

import LoadingFallback from './loading';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; details?: string }>;
}): Promise<ReactNode> {
  const { query = '', page = '1', details = null } = await searchParams;
  const data = await fetchPeople(query, +page);
  let dataDetails: DetailPersonResponse | null = null;

  if (details) {
    dataDetails = await fetchDetails(details);
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Main
        data={data}
        details={dataDetails}
        initialQuery={query}
        initialPage={page}
      />
      ;
    </Suspense>
  );
}
