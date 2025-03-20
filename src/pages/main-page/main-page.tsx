import { useEffect, useState } from 'react';

import { Card } from '../../components/card/card';
import { getCountries } from '../../services/countries-api';
import { Country, Region } from '../../types/country';
import './main-page.css';

const MainPage = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [regionFilter, setRegionFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (countries) {
      let filteredData = countries;
      if (regionFilter) {
        filteredData = filteredData.filter(
          (country) => country.region === regionFilter
        );
      }
      setFilteredCountries(filteredData);
    }
  }, [countries, regionFilter]);

  const countriesToDisplay = regionFilter ? filteredCountries : countries || [];

  return (
    <div>
      <h1>Countries</h1>
      <select
        onChange={(e) => setRegionFilter(e.target.value)}
        value={regionFilter}
      >
        {Object.values(Region).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <div className="country-list">
        {countriesToDisplay.map((country) => (
          <Card country={country} key={country.name.common} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
