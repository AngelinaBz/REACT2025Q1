import React, { useState } from 'react';

import { Region } from '../../types/country';

interface FilterProps {
  onFilter(region: Region): void;
}

export const Filter = ({ onFilter }: FilterProps) => {
  const [regionFilter, setRegionFilter] = useState(Region.All);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value as Region;
    setRegionFilter(region);
    onFilter(region);
  };
  return (
    <select onChange={handleChange} value={regionFilter}>
      {Object.values(Region).map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};
