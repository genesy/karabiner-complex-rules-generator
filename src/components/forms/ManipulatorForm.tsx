import React, { useState, useEffect } from 'react';
import {
  Select,
  Box,
  ButtonGroup,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  ExpansionPanelSummary,
  ExpansionPanel,
  Button,
  Typography,
} from '@material-ui/core';

import { titleCase, suffix } from '../../helpers';
import AddConditionForm from './AddConditionForm';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ToEventForm from './ToEventForm';
import IManipulator from '../../types/IManipulator';
import ICondition from '../../types/ICondition';
import FromEventForm from './FromEventForm';
interface Props {
  manipulator: IManipulator;
}
const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];
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

interface Props2 {
  manipulator: IManipulator;
}
const ToEventForms: React.FC<Props2> = ({ manipulator }) => {
  return (
    <Box>
      {toFields.map((toField: string, toFieldsIndex: number) => {
        return (
          manipulator[toField] && (
            <ExpansionPanel key={toFieldsIndex} defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                "{titleCase(toField)}" Events
              </ExpansionPanelSummary>
              <Box p={2}>
                {manipulator[toField].map((_to: any, index: number) => (
                  <ExpansionPanel key={index} defaultExpanded={index === 0}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      {index + 1}
                      {suffix(index + 1)} "{titleCase(toField)}" Event
                    </ExpansionPanelSummary>
                    <Box p={1}>
                      <ToEventForm
                        type={toField}
                        index={index}
                        rule={manipulator}
                      />
                    </Box>
                  </ExpansionPanel>
                ))}
              </Box>
            </ExpansionPanel>
          )
        );
      })}
    </Box>
  );
};

const ManipulatorForm: React.FC<Props> = ({ manipulator }) => {
  const [manipulatorState, setManipulatorState] = useState<IManipulator>(
    manipulator,
  );

  // add 'to event form'
  const addToEventForm = (type: string) => {
    const newManipulatorState = { ...manipulatorState };
    newManipulatorState[type] = newManipulatorState[type] || [];
    newManipulatorState[type].push({});
    setManipulatorState(newManipulatorState);
  };
  const addConditionToRule = () => {
    const newManipulatorState = { ...manipulatorState };
    newManipulatorState.conditions = newManipulatorState.conditions || [];
    newManipulatorState.conditions.push({
      type: 'frontmost_application_if',
    });
    setManipulatorState(newManipulatorState);
  };

  useEffect(() => {
    setManipulatorState(manipulator);
  }, [manipulator]);

  return (
    <div>
      <FormControl variant="filled" fullWidth>
        <InputLabel id="type">Type*</InputLabel>
        <Select
          labelId="type"
          value={manipulatorState.type}
          onChange={(e: any) => {
            setManipulatorState({ ...manipulatorState, type: e.target.value });
          }}
        >
          {types.map(type => (
            <MenuItem value={type} key={type}>
              {titleCase(type)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          "From" Event*
        </ExpansionPanelSummary>
        <FromEventForm fromObject={manipulatorState.from} />
      </ExpansionPanel>
      {/* <ToEventForms manipulator={manipulatorState} /> */}

      {manipulatorState.conditions && (
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            Rule Conditions
          </ExpansionPanelSummary>
          <Box p={1}>
            {manipulatorState.conditions.map(
              (condition: ICondition, index: number) => {
                return (
                  <AddConditionForm
                    key={index}
                    index={index}
                    condition={condition}
                  />
                );
              },
            )}
          </Box>
        </ExpansionPanel>
      )}

      <Box>
        <Typography>Add "To" Events</Typography>
        <ButtonGroup>
          {toFields.map((toField: string) => {
            return (
              <Button
                key={toField}
                variant="contained"
                color="primary"
                onClick={() => {
                  addToEventForm(toField);
                }}
                size="small"
              >
                {toField}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
      <Box marginTop={1}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            addConditionToRule();
          }}
        >
          Add Conditions
        </Button>
      </Box>
    </div>
  );
};

export default ManipulatorForm;
