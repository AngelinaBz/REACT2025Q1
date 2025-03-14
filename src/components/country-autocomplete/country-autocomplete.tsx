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
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsDropdownOpen(true);
    if (onChange) {
      onChange(value);
    }
  };

  const handleSelect = (country: string) => {
    setQuery(country);
    if (onChange) {
      onChange(country);
    }
    setIsDropdownOpen(false);
    setFilteredCountries([]);
  };

  return (
    <div className="country-autocomplete">
      <input
        type="text"
        value={query}
        ref={ref}
        onChange={handleChange}
        placeholder="Select Country"
        onFocus={() => setIsDropdownOpen(true)}
      />
      {isDropdownOpen && filteredCountries.length > 0 && (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index} onClick={() => handleSelect(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

CountryAutocomplete.displayName = 'CountryAutocomplete';
export default CountryAutocomplete;
