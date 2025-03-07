'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useSearchQuery } from '@/hooks/useSearchQuery';

import ThemeSelector from '../themeContext/ThemeSelector';
import { useTheme } from '../themeContext/UseTheme';

import './Search.module.css';

const Search = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get('query');
  const [query, setQuery] = useSearchQuery();
  const [search, setSearch] = useState<string>(queryParam || query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (query && !queryParam) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('query', query);
      router.push(`/search/pages?${params.toString()}`);
    }
  }, [query, router, searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams?.toString());
    if (search) {
      params.set('query', search);
    } else params.delete('query');
    if (search !== queryParam) {
      params.set('page', '1');
    }
    setQuery(search);
    router.push(`/search/pages?${params.toString()}`);
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
        value={search}
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
