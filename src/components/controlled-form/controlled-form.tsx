import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addControlledFormData } from '../../redux/slices/form-slice';
import { FormInput } from '../../types/types';
import { schema } from '../../validation/yup';
import CountryAutocomplete from '../country-autocomplete/country-autocomplete';
import './controlled-form.css';

const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<FormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  const [country, setCountry] = useState('');
  const dispatch = useDispatch();

  const convertFileToBase64 = (file: File | null): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (data: FormInput) => {
    const convertedPicture = await convertFileToBase64(data.picture[0]);
    const convertedData = {
      ...data,
      age: data.age.toString() || '',
      picture: convertedPicture || '',
    };
    dispatch(addControlledFormData(convertedData));
    console.log(convertedData);
  };

  return (
    <form className="controlled-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <label htmlFor="age">Age:</label>
      <input type="number" {...register('age')} />
      {errors.age && <span>{errors.age.message}</span>}

      <label htmlFor="email">Email:</label>
      <input type="email" {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <label htmlFor="password">Password:</label>
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <label htmlFor="repeatPassword">Repeat Password:</label>
      <input type="password" {...register('repeatPassword')} />
      {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}

      <label htmlFor="gender">Gender:</label>
      <select {...register('gender')}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <span>{errors.gender.message}</span>}

      <label>Accept Terms and Conditions</label>
      <input type="checkbox" {...register('terms')} />
      {errors.terms && <span>{errors.terms.message}</span>}

      <label htmlFor="picture">Upload Picture:</label>
      <input type="file" {...register('picture')} />
      {errors.picture && <span>{errors.picture.message}</span>}

      <label htmlFor="country">Select Country:</label>
      <CountryAutocomplete
        value={country}
        onChange={(value) => {
          setCountry(value);
          setValue('country', value, { shouldValidate: true });
        }}
      />
      {errors.country && <span>{errors.country.message}</span>}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;
