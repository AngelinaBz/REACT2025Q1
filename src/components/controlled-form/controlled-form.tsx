import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addControlledFormData } from '../../redux/slices/form-slice';
import { FormInput } from '../../types/types';
import PasswordStrength from '../../utils/password-strength/password-strength';
import { schema } from '../../validation/yup';
import CountryAutocomplete from '../country-autocomplete/country-autocomplete';
import './controlled-form.css';

const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { isValid, errors },
  } = useForm<FormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchPassword = watch('password');
  const watchRepeatPassword = watch('repeatPassword');

  useEffect(() => {
    if (watchPassword && watchRepeatPassword) {
      trigger('repeatPassword');
    }
  }, [watchPassword, watchRepeatPassword, trigger]);

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
      id: Date.now().toString(),
      ...data,
      age: data.age.toString() || '',
      picture: convertedPicture || '',
    };
    dispatch(addControlledFormData(convertedData));
    navigate('/');
  };

  return (
    <form className="controlled-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input {...register('name')} />
      {errors.name && <p className="error">*{errors.name.message}</p>}

      <label htmlFor="age">Age:</label>
      <input type="number" {...register('age')} />
      {errors.age && <p className="error">*{errors.age.message}</p>}

      <label htmlFor="email">Email:</label>
      <input type="email" {...register('email')} />
      {errors.email && <p className="error">*{errors.email.message}</p>}

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        {...register('password', {
          onChange: (e) => {
            const newPassword = e.target.value;
            setPassword(newPassword);
          },
        })}
      />
      {errors.password && <p className="error">*{errors.password.message}</p>}
      <PasswordStrength password={password} />

      <label htmlFor="repeatPassword">Repeat Password:</label>
      <input type="password" {...register('repeatPassword')} />
      {errors.repeatPassword && (
        <p className="error">*{errors.repeatPassword.message}</p>
      )}

      <label htmlFor="gender">Gender:</label>
      <select {...register('gender')}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p className="error">*{errors.gender.message}</p>}

      <label>Accept Terms and Conditions</label>
      <input type="checkbox" {...register('terms')} />
      {errors.terms && <p className="error">*{errors.terms.message}</p>}

      <label htmlFor="picture">Upload Picture:</label>
      <input type="file" {...register('picture')} />
      {errors.picture && <p className="error">*{errors.picture.message}</p>}

      <label htmlFor="country">Select Country:</label>
      <CountryAutocomplete
        value={country}
        onChange={(value) => {
          setCountry(value);
          setValue('country', value, { shouldValidate: true });
        }}
      />
      {errors.country && <p className="error">*{errors.country.message}</p>}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;
