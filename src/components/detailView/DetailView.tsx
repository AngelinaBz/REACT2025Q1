import { useState, useEffect } from 'react';
import Loading from '../loading/Loading';
import { fetchDetailPerson } from '../../services/api';
import { Person } from '../../utils/interfaces';

interface DetailViewProps {
  personId: string;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ personId, onClose }) => {
  const [detail, setDetail] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDetailPerson(personId);
        setDetail(data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [personId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!detail) {
    return <div>Error loading detail</div>;
  }

  return (
    <div className="detail-view">
      <h2>{detail.name}</h2>
      <p>{detail.gender}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DetailView;
