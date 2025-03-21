import React, { useState } from 'react';

interface SortProps {
  onSortCriteriaChange(criteria: string): void;
  onSortOrderChange(order: string): void;
}

const Sort = ({ onSortCriteriaChange, onSortOrderChange }: SortProps) => {
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortCriteriaChange(e.target.value);
    setSortCriteria(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortOrderChange(e.target.value);
    setSortOrder(e.target.value);
  };

  return (
    <div>
      <span>Sort by: </span>
      <select onChange={handleCriteriaChange} value={sortCriteria}>
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>
      <span> Order: </span>
      <select onChange={handleOrderChange} value={sortOrder}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
};

export default Sort;
