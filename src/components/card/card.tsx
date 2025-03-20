import { Country } from '../../types/country';
import './card.css';

interface CardProps {
  country: Country;
}

export const Card = ({ country }: CardProps) => {
  return (
    <div key={country.name.common} className="country-card">
      <h2 className="country-name">{country.name.common}</h2>
      <p className="country-population">Population: {country.population}</p>
      <p className="country-region">Region: {country.region}</p>
      <img
        src={country.flags.png}
        alt={country.name.common}
        className="country-img"
      />
    </div>
  );
};
