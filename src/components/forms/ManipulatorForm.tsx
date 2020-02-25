import React from 'react';
import {
  Select,
  Box,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  ExpansionPanelSummary,
  ExpansionPanel,
  Button,
  Typography,
} from '@material-ui/core';

import { titleCase } from '../../helpers';
import AddConditionForm from './AddConditionForm';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IManipulator from '../../types/IManipulator';
import ICondition from '../../types/ICondition';
import FromEventForm from './FromEventForm';
import IFromEventDefinition from '../../types/IFromEventDefinition';
import ToEventFormsContainer from './ToEventFormsContainer';
import _ from 'lodash';

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

interface Props {
  manipulator: IManipulator;
  setManipulator: (arg0: IManipulator) => void;
}

const ManipulatorForm: React.FC<Props> = ({ manipulator, setManipulator }) => {
  // add 'to event form'
  const addToEventForm = (type: string) => {
    const newManipulator = { ...manipulator };
    newManipulator[type] = newManipulator[type] || [];
    newManipulator[type].push({ repeat: true, _id: _.uniqueId(type + '_') });
    setManipulator(newManipulator);
  };
  const addConditionToRule = () => {
    const newManipulator = { ...manipulator };
    newManipulator.conditions = newManipulator.conditions || [];
    newManipulator.conditions.push({
      type: 'frontmost_application_if',
    });
    setManipulator(newManipulator);
  };

  const setFromObject = (newFromObject: IFromEventDefinition) => {
    const newManipulator = { ...manipulator, from: newFromObject };
    setManipulator(newManipulator);
  };

  return (
    <div>
      <FormControl variant="filled" fullWidth>
        <InputLabel id="type">Type*</InputLabel>
        <Select
          labelId="type"
          value={manipulator.type}
          onChange={(e: any) => {
            setManipulator({ ...manipulator, type: e.target.value });
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
        <FromEventForm
          fromObject={manipulator.from}
          setFromObject={setFromObject}
        />
      </ExpansionPanel>
      <ToEventFormsContainer
        manipulator={manipulator}
        setManipulator={setManipulator}
      />

      {manipulator.conditions && (
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            Rule Conditions
          </ExpansionPanelSummary>
          <Box p={1}>
            {manipulator.conditions.map(
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
