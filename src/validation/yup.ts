import * as yup from 'yup';

import { countries } from '../types/countries';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .test(
      'is-first-letter-uppercase',
      'The name should be starts with uppercase letter',
      (value) => /^[A-ZА-Я]/.test(value[0])
    ),
  age: yup
    .number()
    .typeError('Age is required')
    .required('Age is required')
    .min(0, 'Age must be a positive integer'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/(?=.*\d)/g, 'Password must contain at least one number')
    .matches(
      /(?=.*[A-Z|А-Я])/g,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      /(?=.*[a-z|а-я])/g,
      'Password must contain at least one lowercase letter'
    )
    .matches(
      /(?=.*[@$!%*?&])/g,
      'Password must contain at least one special character'
    ),
  repeatPassword: yup
    .string()
    .required('Repeat Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .boolean()
    .required('Terms is required')
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed<FileList>()
    .required()
    .test('fileRequired', 'Picture is required', (value) => !!value?.length)
    .test('fileSize', 'File size is too large', (value) => {
      if (!value || !value.length) return false;
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || !value.length) return false;
      return ['image/png', 'image/jpeg'].includes(value[0].type);
    }),
  country: yup
    .string()
    .required('Country is required')
    .oneOf(countries, 'Select country from list'),
});
