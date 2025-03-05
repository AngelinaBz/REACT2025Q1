import { useState, useEffect } from 'react';

import { LS_QUERY } from '@/utils/constants';

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LS_QUERY) ?? '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_QUERY, query);
    }
  }, [query]);

  return [query, setQuery] as const;
};
