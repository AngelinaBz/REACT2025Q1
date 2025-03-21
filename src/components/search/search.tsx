import { useState } from 'react';

interface SearchProps {
  onSearch(searchQuery: string): void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleChange}
    />
  );
};
