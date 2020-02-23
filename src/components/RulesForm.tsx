import React, { useContext } from 'react';
import { InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import FromEventForm from './forms/FromEventForm';
import FormContext from '../context/FormContext';
import ToEventForm from './forms/ToEventForm';

interface Props {
  index: number;
}

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

const RulesForm: React.FC<Props> = ({ index: ruleIndex }) => {
  const { getRuleByIndex, setRuleState } = useContext(FormContext);
  const ruleState = getRuleByIndex(ruleIndex);

  // add 'to event form'
  const addToEventForm = (type: string) => {
    const newRuleState = { ...ruleState };
    newRuleState[type] = newRuleState[type] || [];
    newRuleState[type].push({});
    setRuleState(ruleIndex, newRuleState);
  };
  return (
    <div>
      <InputLabel id="type">type</InputLabel>
      <Select
        labelId="type"
        value={ruleState.type}
        onChange={e => {
          setRuleState(ruleIndex, { ...ruleState, type: e.target.value });
        }}
      >
        {types.map(type => (
          <MenuItem value={type} key={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <FromEventForm ruleIndex={ruleIndex} />
      {toFields.map((toField: string) => {
        return (
          <div key={toField}>
            {ruleState[toField] &&
              ruleState[toField].map((to: any, index: number) => (
                <ToEventForm
                  type={toField}
                  key={index}
                  index={index}
                  ruleIndex={ruleIndex}
                />
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

export default RulesForm;
