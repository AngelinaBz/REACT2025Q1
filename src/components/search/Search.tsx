import React from 'react';
import './Search.css';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { useTheme } from '../themeContext/UseTheme';
import ThemeSelector from '../themeContext/ThemeSelector';

interface SearchProps {
  onSearch: (query: string) => void;
  onError: () => void;
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
