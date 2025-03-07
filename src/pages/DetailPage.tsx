import DetailView from '@/components/detailView/DetailView';
import { fetchDetails } from '@/utils/api.ts';
import { DetailPersonResponse } from '@/utils/types.ts';

interface Props {
  detailId: string;
}

async function DetailedPage({ detailId }: Props) {
  const id = detailId;

  let dataDetails: DetailPersonResponse | null = null;

  dataDetails = await fetchDetails(id);

  return <DetailView details={dataDetails} />;
}

export default DetailedPage;
