import { useEffect, useState } from 'react';

import { getCountries } from '../../services/countries-api';
import './main-page.css';
import { Country } from '../../types/country';

const MainPage = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
      console.log(countries);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Countries</h1>
    </div>
  );
};

export default MainPage;
