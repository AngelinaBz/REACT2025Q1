import { useState, useEffect } from 'react';

import {
  addVisitedCountries,
  getVisitedCountries,
} from '../../services/local-storage';
import { Country } from '../../types/country';
import './card.css';

interface CardProps {
  country: Country;
}

export const Card = ({ country }: CardProps) => {
  const [isVisited, setIsVisited] = useState(false);

  useEffect(() => {
    const visitedCountries = getVisitedCountries();
    if (visitedCountries.includes(country.name.common)) {
      setIsVisited(true);
    }
  }, [country.name.common]);

  const handleToggle = () => {
    setIsVisited((prevVisited) => {
      const newVisitedState = !prevVisited;

      const visitedCountries = getVisitedCountries();
      if (newVisitedState) {
        visitedCountries.push(country.name.common);
      } else {
        const index = visitedCountries.indexOf(country.name.common);
        if (index > -1) {
          visitedCountries.splice(index, 1);
        }
      }
      addVisitedCountries(visitedCountries);

      return newVisitedState;
    });
  };

  return (
    <div
      key={country.name.common}
      className={`country-card ${isVisited ? 'visited' : ''}`}
      onClick={handleToggle}
    >
      <img
        src={country.flags.png}
        alt={country.name.common}
        className="country-img"
      />
      <h3 className="country-name">{country.name.common}</h3>
      <p className="country-population">Population: {country.population}</p>
      <p className="country-region">Region: {country.region}</p>
      {isVisited && <p className="visited-label">Visited</p>}
    </div>
  );
};
