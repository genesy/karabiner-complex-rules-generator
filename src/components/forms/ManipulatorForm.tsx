import React, { useMemo } from 'react';
import {
  Select,
  Box,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core';

import { titleCase, withSuffix } from '../../helpers';
import AddConditionForm from './AddConditionForm';
import IManipulator from '../../types/IManipulator';
import ICondition from '../../types/ICondition';
import FromEventForm from './FromEventForm';
import IFromEventDefinition from '../../types/IFromEventDefinition';
import ToEventFormsContainer from './ToEventFormsContainer';
import _ from 'lodash';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import AppSelect from '../shared/AppSelect';
import { useDispatch } from 'react-redux';
import { setManipulator } from '../../ducks/formState';

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
  index: number;
  ruleIndex: number;
}

const ManipulatorForm: React.FC<Props> = ({
  manipulator,
  ruleIndex,
  index,
}) => {
  const dispatch = useDispatch();
  // add 'to event form'
  const addToEventForm = (type: string) => {
    // const newManipulator = { ...manipulator };
    // newManipulator[type] = newManipulator[type] || [];
    // newManipulator[type].push({ repeat: true, _id: _.uniqueId(type + '_') });
    // setManipulator(newManipulator);
  };
  const addConditionToRule = () => {
    // const newManipulator = { ...manipulator };
    // newManipulator.conditions = newManipulator.conditions || [];
    // newManipulator.conditions.push({
    //   type: 'frontmost_application_if',
    // });
    // setManipulator(newManipulator);
  };

  const setFromObject = (newFromObject: IFromEventDefinition) => {
    // const newManipulator = { ...manipulator, from: newFromObject };
    // setManipulator(newManipulator);
  };

  return useMemo(
    () => (
      <AppExpansionPanel
        panelProps={{ defaultExpanded: true }}
        title={`${withSuffix(index + 1)} Manipulator`}
      >
        <AppSelect
          label="Type"
          value={manipulator.type}
          options={types}
          onChange={(e: any) => {
            dispatch(
              setManipulator({
                manipulator: { ...manipulator, type: e.target.value },
                index,
                ruleIndex,
              }),
            );
          }}
        />
        <AppExpansionPanel
          panelProps={{ defaultExpanded: true }}
          title={`"From" Event`}
        >
          <FromEventForm
            fromObject={manipulator.from}
            manipulatorIndex={index}
            ruleIndex={ruleIndex}
          />
        </AppExpansionPanel>

        {/* <ToEventFormsContainer

          manipulator={manipulator}
          ruleIndex={ruleIndex}
          manipulatorIndex={index}
        /> */}

        {manipulator.conditions && (
          <AppExpansionPanel
            panelProps={{ defaultExpanded: true }}
            title="Rule Conditions"
          >
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
          </AppExpansionPanel>
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
      </AppExpansionPanel>
    ),
    [manipulator],
  );
};

export default ManipulatorForm;
