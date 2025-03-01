import { useState, useEffect } from 'react';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedQuery = localStorage.getItem('searchQuery');
      if (storedQuery) {
        setQuery(storedQuery);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchQuery', query);
    }
  }, [query]);

  return [query, setQuery] as const;
};
