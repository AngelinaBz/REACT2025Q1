import { FormEvent, useRef } from 'react';
import './uncontrolled-form.css';

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password1: passwordRef.current?.value || '',
      password2: passwordRepeatRef.current?.value || '',
      gender: genderRef.current?.value || '',
      termsAccepted: termsRef.current?.checked,
      picture: pictureRef.current?.files?.[0],
      country: countryRef.current?.value || '',
    };
    console.log(data);
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
