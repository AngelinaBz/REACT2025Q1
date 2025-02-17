import Loading from '../loading/Loading';
import { useFetchDetailPersonQuery } from '../../redux/slices/starWarsApi';
import './DetailView.css';
import { useTheme } from '../themeContext/UseTheme';

interface DetailViewProps {
  personId: string;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ personId, onClose }) => {
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
        src={`https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`}
        alt={detail.name}
      ></img>
      <h2>{detail.name}</h2>
      <p>Gender: {detail.gender}</p>
      <p>Birth Year: {detail.birth_year}</p>
      <button className={`button-${theme}`} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default DetailView;
