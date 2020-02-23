import React, { useContext } from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import FromEventForm from './forms/FromEventForm';
import FormContext from '../context/FormContext';

interface Props {}

const types: string[] = [
  'basic',
  'frontmost_application_if',
  'frontmost_application_unless',
  'device_if',
  'device_unless',
  'keyboard_type_if',
  'keyboard_type_unless',
  'input_source_if',
  'input_source_unless',
  'variable_if',
  'variable_unless',
  'event_changed_if',
  'event_changed_unless',
];

const Form: React.FC<Props> = () => {
  const { formState, setFormState } = useContext(FormContext);
  return (
    <div>
      <InputLabel id="type">type</InputLabel>
      <Select
        labelId="type"
        value={formState.type}
        onChange={e => {
          setFormState({ ...formState, type: e.target.value });
        }}
      >
        {types.map(type => (
          <MenuItem value={type} key={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <FromEventForm />
    </div>
  );
};

export default Form;
