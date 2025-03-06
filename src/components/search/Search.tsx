'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { useSearchQuery } from '@/hooks/useSearchQuery';

import ThemeSelector from '../themeContext/ThemeSelector';
import { useTheme } from '../themeContext/UseTheme';

import './Search.module.css';

const Search = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useSearchQuery();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    router.push(`?q=${query.trim()}`);
  };

  const handleError = () => {
    try {
      throw new Error('Testing Error');
    } catch (error) {
      console.error('Error caught in ErrorBoundary: ', error);
    }
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
