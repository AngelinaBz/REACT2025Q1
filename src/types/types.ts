export interface FormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  terms: boolean;
  picture: FileList;
  country: string;
}

export interface FormDataRedux {
  id: string;
  name: string;
  age: string;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
}
