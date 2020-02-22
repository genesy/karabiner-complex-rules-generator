import { createContext } from 'react';

const FormContext = createContext({
  setFormState: (s: any) => s,
  formState: {},
});

export default FormContext;
