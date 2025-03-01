import React from 'react';

import { useSearchQuery } from '../../hooks/useSearchQuery';
import ThemeSelector from '../themeContext/ThemeSelector';
import { useTheme } from '../themeContext/UseTheme';
import './Search.module.css';

interface SearchProps {
  onSearch(query: string): void;
  onError(): void;
}

const Search = ({ onSearch, onError }: SearchProps) => {
  const { theme } = useTheme();
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
        aria-label="Search"
      />
      <button className={`button-${theme}`} onClick={handleSearch}>
        Search
      </button>
      <button className={`button-${theme}`} onClick={handleError}>
        Throw Error
      </button>
      <ThemeSelector />
    </section>
  );
};

export default Search;
