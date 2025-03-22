import { useCallback, useEffect, useMemo, useState } from 'react';

import { Card } from '../../components/card/card';
import { Filter } from '../../components/filter/filter';
import { Search } from '../../components/search/search';
import Sort from '../../components/sort/sort';
import { getCountries } from '../../services/countries-api';
import { Country, Region } from '../../types/country';
import './main-page.css';

const MainPage = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState(Region.All);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    const filteredData = countries.filter((country) => {
      const matchesRegion =
        regionFilter === Region.All || country.region === regionFilter;
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
    return filteredData;
  }, [countries, regionFilter, searchQuery]);

  const sortedData = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
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
  }, [filteredCountries, sortCriteria, sortOrder]);

  const handleSearch = useCallback((searchQuery: string) => {
    setSearchQuery(searchQuery);
  }, []);

  const handleFilter = useCallback((region: Region) => {
    setRegionFilter(region);
  }, []);

  const handleSortCriteriaChange = useCallback((criteria: string) => {
    setSortCriteria(criteria);
  }, []);

  const handleSortOrderChange = useCallback((order: string) => {
    setSortOrder(order);
  }, []);

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
        {sortedData.map((country) => (
          <Card country={country} key={country.name.common} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
