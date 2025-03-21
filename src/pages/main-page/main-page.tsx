import { useEffect, useState } from 'react';

import { Card } from '../../components/card/card';
import { Filter } from '../../components/filter/filter';
import { Search } from '../../components/search/search';
import Sort from '../../components/sort/sort';
import { getCountries } from '../../services/countries-api';
import { Country, Region } from '../../types/country';
import './main-page.css';

const MainPage = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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
        const matchesRegion =
          regionFilter === Region.All || country.region === regionFilter;
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesRegion && matchesSearch;
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
  }, [countries, regionFilter, sortCriteria, sortOrder, searchQuery]);

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleFilter = (region: Region) => {
    setRegionFilter(region);
  };

  const handleSortCriteriaChange = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };

  return (
    <div>
      <h1>Countries</h1>
      <Search onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      <Sort
        onSortCriteriaChange={handleSortCriteriaChange}
        onSortOrderChange={handleSortOrderChange}
      />
      <div className="country-list">
        {filteredCountries.map((country) => (
          <Card country={country} key={country.name.common} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
