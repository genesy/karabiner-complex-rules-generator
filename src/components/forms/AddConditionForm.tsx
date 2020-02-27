import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { titleCase, withSuffix } from '../../helpers';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import IManipulator from '../../types/IManipulator';
import FrontmostConditionForm from './FrontmostConditionForm';
import DeviceIfConditionForm from './DeviceIfConditionForm';
import KeyboardTypeConditionForm from './KeyboardTypeConditionForm';
import VariableConditionForm from './VariableConditionForm';
import InputSourceConditionForm from './InputSourceConditionForm';
import EventChangedConditionForm from './EventChangedConditionForm';

interface Props {
  condition: any;
  index: number;
  setManipulator: (arg0: IManipulator) => void;
  manipulator: IManipulator;
}
const conditionTypes: string[] = [
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

const AddConditionForm: React.FC<Props> = ({
  condition,
  index,
  setManipulator,
  manipulator,
}) => {
  const setConditionState = (condition: any) => {
    const newManipulator = { ...manipulator };
    const newConditions = [...manipulator.conditions];
    newConditions[index] = condition;
    newManipulator.conditions = newConditions;
    setManipulator(newManipulator);
  };

  return (
    <AppExpansionPanel
      panelProps={{ defaultExpanded: index === 0 }}
      title={`${withSuffix(index + 1)} Condition`}
    >
      <FormControl fullWidth variant="filled">
        <InputLabel id="condition_type">Condition Type</InputLabel>
        <Select
          labelId="condition_type"
          value={condition.type}
          onChange={e => {
            setConditionState({ ...condition, type: e.target.value });
          }}
        >
          {conditionTypes.map(item => (
            <MenuItem value={item} key={item}>
              {titleCase(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        variant="filled"
        label={`Condition Description (optional)`}
        value={condition.description}
        onChange={e => {
          setConditionState({ ...condition, description: e.target.value });
        }}
      />

      {condition.type.indexOf('frontmost') === 0 && (
        <FrontmostConditionForm
          condition={condition}
          setConditionState={setConditionState}
        />
      )}
      {condition.type.indexOf('device') === 0 && (
        <DeviceIfConditionForm
          condition={condition}
          setConditionState={setConditionState}
        />
      )}
      {condition.type.indexOf('keyboard') === 0 && (
        <KeyboardTypeConditionForm
          condition={condition}
          setConditionState={setConditionState}
        />
      )}
      {condition.type.indexOf('input_source') === 0 && (
        <InputSourceConditionForm
          condition={condition}
          setConditionState={setConditionState}
        />
      )}
      {condition.type.indexOf('variable') === 0 && (
        <VariableConditionForm
          condition={condition}
          setConditionState={setConditionState}
        />
      )}
      {condition.type.indexOf('event_changed') === 0 && (
        <EventChangedConditionForm
          condition={condition}
          setConditionState={setConditionState}
        />
      )}
    </AppExpansionPanel>
  );
};

export default AddConditionForm;
