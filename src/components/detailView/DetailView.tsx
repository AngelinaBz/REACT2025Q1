import { useFetchDetailPersonQuery } from '../../redux/slices/starWarsApi';
import Loading from '../loading/Loading';
import { useTheme } from '../themeContext/UseTheme';
import './DetailView.module.css';

interface DetailViewProps {
  personId: string;
  onClose(): void;
}

const DetailView = ({ personId, onClose }: DetailViewProps) => {
  const {
    data: detail,
    error,
    isLoading,
  } = useFetchDetailPersonQuery(personId);
  const { theme } = useTheme();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error('Error fetching detail:', error);
  }

  if (!detail) {
    return <div>Error loading detail</div>;
  }

  return (
    <div className="detail-view">
      <img
        className="detail-view__image"
        src={`https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`}
        alt={detail.name || 'Unknown character'}
      ></img>
      <h2 className="detail-view__name">{detail.name}</h2>
      <p className="detail-view__information">Gender: {detail.gender}</p>
      <p className="detail-view__information">
        Birth Year: {detail.birth_year}
      </p>
      <button className={`button-${theme}`} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default DetailView;
