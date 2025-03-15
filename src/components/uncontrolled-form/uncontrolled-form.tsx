import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

import { addUncontrolledFormData } from '../../redux/slices/form-slice';
import PasswordStrength from '../../utils/password-strength/password-strength';
import { schema } from '../../validation/yup';
import CountryAutocomplete from '../country-autocomplete/country-autocomplete';
import './uncontrolled-form.css';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const file = pictureRef.current?.files?.[0];
    const data = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      repeatPassword: passwordRepeatRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: !!termsRef.current?.checked,
      picture: pictureRef.current?.files || '',
      country: countryRef.current?.value || '',
    };
    setPassword(data.password);
    try {
      schema.validateSync(data, { abortEarly: false });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const convertedData = { ...data, picture: base64String };
          dispatch(addUncontrolledFormData(convertedData));
          navigate('/');
        };
        reader.readAsDataURL(file);
      } else {
        const convertedData = { ...data, picture: '' };
        dispatch(addUncontrolledFormData(convertedData));
        navigate('/');
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors = error.inner.reduce(
          (acc: { [key: string]: string }, err) => {
            if (err.path) {
              acc[err.path] = err.message;
            }
            return acc;
          },
          {}
        );
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form className="uncontrolled-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" ref={nameRef} />
      {errors.name && <p className="error">*{errors.name}</p>}

      <label htmlFor="age">Age:</label>
      <input type="number" ref={ageRef} />
      {errors.age && <p className="error">*{errors.age}</p>}

      <label htmlFor="email">Email:</label>
      <input type="email" ref={emailRef} />
      {errors.email && <p className="error">*{errors.email}</p>}

      <label htmlFor="password">Password:</label>
      <input type="password" ref={passwordRef} />
      {errors.password && <p className="error">*{errors.password}</p>}
      <PasswordStrength password={password} />

      <label htmlFor="passwordRepeat">Repeat Password:</label>
      <input type="password" ref={passwordRepeatRef} />
      {errors.repeatPassword && (
        <p className="error">*{errors.repeatPassword}</p>
      )}

      <label htmlFor="gender">Gender:</label>
      <select ref={genderRef}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p className="error">*{errors.gender}</p>}

      <label>Accept Terms and Conditions</label>
      <input type="checkbox" ref={termsRef} />
      {errors.terms && <p className="error">*{errors.terms}</p>}

      <label htmlFor="picture">Upload Picture:</label>
      <input type="file" id="picture" ref={pictureRef} />
      {errors.picture && <p className="error">*{errors.picture}</p>}

      <label htmlFor="country">Select Country:</label>
      <CountryAutocomplete ref={countryRef} />
      {errors.country && <p className="error">*{errors.country}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
