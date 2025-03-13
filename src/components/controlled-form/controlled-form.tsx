import { useForm } from 'react-hook-form';

import { FormInput } from '../../types/types';
import './controlled-form.css';

const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    console.log(data);
  };

  return (
    <form className="controlled-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input {...register('name')} />
      {errors.name && <span>errors.name.message</span>}

      <label htmlFor="age">Age:</label>
      <input type="number" {...register('age')} />
      {errors.age && <span>errors.age.message</span>}

      <label htmlFor="email">Email:</label>
      <input type="email" {...register('email')} />
      {errors.email && <span>errors.email.message</span>}

      <label htmlFor="password1">Password:</label>
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <label htmlFor="password2">Repeat Password:</label>
      <input type="password" {...register('password')} />
      {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}

      <label htmlFor="gender">Gender:</label>
      <select {...register('gender')}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <span>{errors.gender.message}</span>}

      <label>Accept Terms and Conditions</label>
      <input type="checkbox" {...register('terms')} />
      {errors.terms && <span>{errors.terms.message}</span>}

      <label htmlFor="picture">Upload Picture:</label>
      <input type="file" {...register('picture')} />
      {errors.picture && <span>{errors.picture.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledForm;
