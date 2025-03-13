import { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addUncontrolledFormData } from '../../redux/slices/formSlice';
import './uncontrolled-form.css';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
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
    let base64String = '';
    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          base64String = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
      const data = {
        name: nameRef.current?.value || '',
        age: ageRef.current?.value || '',
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        repeatPassword: passwordRepeatRef.current?.value || '',
        gender: genderRef.current?.value || '',
        terms: termsRef.current?.checked ?? false,
        picture: base64String,
        country: countryRef.current?.value || '',
      };
      dispatch(addUncontrolledFormData(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="uncontrolled-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" ref={nameRef} />
      <label htmlFor="age">Age:</label>
      <input type="number" ref={ageRef} />
      <label htmlFor="email">Email:</label>
      <input type="email" ref={emailRef} />
      <label htmlFor="password">Password:</label>
      <input type="password" ref={passwordRef} />
      <label htmlFor="passwordRepeat">Repeat Password:</label>
      <input type="password" ref={passwordRepeatRef} />
      <label htmlFor="gender">Gender:</label>
      <select ref={genderRef}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <label>Accept Terms and Conditions</label>
      <input type="checkbox" ref={termsRef} />
      <label htmlFor="picture">Upload Picture:</label>
      <input type="file" id="picture" ref={pictureRef} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
