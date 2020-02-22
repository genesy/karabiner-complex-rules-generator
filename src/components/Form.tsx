import React from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';
import FromEventForm from './forms/FromEventForm';

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
  return (
    <div>
      <InputLabel id="type">type</InputLabel>
      <Select labelId="type" value={types[0]}>
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
