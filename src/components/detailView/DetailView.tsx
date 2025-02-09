import { useState, useEffect } from 'react';
import Loading from '../loading/Loading';
import { fetchDetailPerson } from '../../services/api';
import { Person } from '../../utils/interfaces';
import './DetailView.css';

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
        console.log(data);
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
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`}
        alt={detail.name}
      ></img>
      <h2>{detail.name}</h2>
      <p>Gender: {detail.gender}</p>
      <p>Birth Year: {detail.birth_year}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DetailView;
