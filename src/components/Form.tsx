import React, { useContext } from 'react';
import { InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import FromEventForm from './forms/FromEventForm';
import FormContext from '../context/FormContext';
import ToEventForm from './forms/ToEventForm';

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

const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];
const Form: React.FC<Props> = () => {
  const { formState, setFormState } = useContext(FormContext);
  const addToEventForm = (type: string) => {
    const newFormState = { ...formState };
    newFormState[type] = newFormState[type] || [];
    newFormState[type].push({});
    setFormState(newFormState);
  };
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
      {toFields.map((toField: string) => {
        return (
          <div key={toField}>
            {formState[toField] &&
              formState[toField].map((to: any, index: number) => (
                <ToEventForm type={toField} key={index} index={index} />
              ))}
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                addToEventForm(toField);
              }}
            >
              Add "{toField}" event definition
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Form;
