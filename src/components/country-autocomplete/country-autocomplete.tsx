import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCountries } from '../../redux/slices/countries-slice';
import './country-autocomplete.css';

interface CountryAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CountryAutocomplete = forwardRef<
  HTMLInputElement,
  CountryAutocompleteProps
>(({ value, onChange }, ref) => {
  const countries = useSelector(selectCountries);
  const [query, setQuery] = useState(value || '');

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="country-autocomplete">
      <input
        type="text"
        list="countries-list"
        value={query}
        ref={ref}
        onChange={handleChange}
        placeholder="Select Country"
      />
      <datalist id="countries-list">
        {countries.map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
    </div>
  );
});

CountryAutocomplete.displayName = 'CountryAutocomplete';
export default CountryAutocomplete;
