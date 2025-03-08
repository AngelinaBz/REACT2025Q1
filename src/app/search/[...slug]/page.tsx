import { redirect } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

import Main from 'src/pages/MainPage';

import LoadingFallback from './loading';

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ query?: string; page?: string }>;
}): Promise<ReactNode> {
  const dataParams = await params;
  const { query, page } = await searchParams;
  const [url, id] = dataParams.slug;

  if (!url || !page) {
    redirect(`/search/pages?page=1`);
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Main initialQuery={query || ''} initialPage={page} detailId={id} />
    </Suspense>
  );
}
