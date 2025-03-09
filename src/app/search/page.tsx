import { redirect } from 'next/navigation';

function Page() {
  redirect(`/search/pages?page=1`);
}

export default Page;
