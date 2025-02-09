import { useState, useEffect } from 'react';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  return [query, setQuery] as const;
};
