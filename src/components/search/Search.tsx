import React from 'react';
import './Search.css';
import { useSearchQuery } from '../../hooks/useSearchQuery';

interface SearchProps {
  onSearch: (query: string) => void;
  onError: () => void;
}

const Search: React.FC<SearchProps> = ({ onSearch, onError }) => {
  const [query, setQuery] = useSearchQuery();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleError = () => {
    onError();
  };

  return (
    <section className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleError}>Throw Error</button>
    </section>
  );
};

export default Search;
