import { createContext } from 'react';

const FormContext = createContext({
  setFormState: (s: any) => s,
  formState: {
    type: 'basic',
  },
});

export default FormContext;
