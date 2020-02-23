import { createContext } from 'react';
import IToEventDefinition from '../types/IToEventDefinition';

type ContextProps = {
  setFormState: any;
  formState: any;
};

const FormContext = createContext<Partial<ContextProps>>({
  setFormState: () => 1,
  formState: {},
});

export default FormContext;
