import { useState, useEffect } from 'react';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('searchQuery') ?? '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchQuery', query);
    }
  }, [query]);

  return [query, setQuery] as const;
};
