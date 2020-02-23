import { createContext } from 'react';
import IToEventDefinition from '../types/IToEventDefinition';

type ContextProps = {
  setFormState: any;
  formState: any;
  setRuleState: any;
  getRuleByIndex: any;
};

const FormContext = createContext<Partial<ContextProps>>({
  setFormState: () => {},
  setRuleState: () => {},
  getRuleByIndex: () => {},
  formState: {},
});

export default FormContext;
