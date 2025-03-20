import { useEffect, useState } from 'react';

import { Card } from '../../components/card/card';
import { getCountries } from '../../services/countries-api';
import { Country, Region } from '../../types/country';
import './main-page.css';

const MainPage = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [regionFilter, setRegionFilter] = useState(Region.All);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (countries) {
      const filteredData = countries.filter((country) => {
        return regionFilter === Region.All || country.region === regionFilter;
      });

      const sortedData = [...filteredData].sort((a, b) => {
        if (sortCriteria === 'name') {
          return sortOrder === 'asc'
            ? a.name.common.localeCompare(b.name.common)
            : b.name.common.localeCompare(a.name.common);
        }
        if (sortCriteria === 'population') {
          return sortOrder === 'asc'
            ? a.population - b.population
            : b.population - a.population;
        }
        return 0;
      });
      setFilteredCountries(sortedData);
    }
  }, [countries, regionFilter, sortCriteria, sortOrder]);

  return (
    <div>
      <h1>Countries</h1>
      <select
        onChange={(e) => setRegionFilter(e.target.value as Region)}
        value={regionFilter}
      >
        {Object.values(Region).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <div>
        <span>Sort by: </span>
        <select
          onChange={(e) => setSortCriteria(e.target.value)}
          value={sortCriteria}
        >
          <option value="name">Name</option>
          <option value="population">Population</option>
        </select>
        <span> Order: </span>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="country-list">
        {filteredCountries.map((country) => (
          <Card country={country} key={country.name.common} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
