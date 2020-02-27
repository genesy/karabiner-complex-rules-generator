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
import { setManipulator, addToObject } from '../../ducks/formState';

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
  const addToEventForm = (toField: string) => {
    dispatch(addToObject({ manipulatorIndex: index, ruleIndex, toField }));
  };

  const _setManipulator = (newManipulator: IManipulator) => {
    dispatch(
      setManipulator({
        ruleIndex,
        index,
        manipulator: newManipulator,
      }),
    );
  };

  const addConditionToRule = () => {
    const newManipulator = { ...manipulator };
    newManipulator.conditions = newManipulator.conditions || [];
    const newConditions = [...newManipulator.conditions];
    newConditions.push({ type: 'frontmost_application_if' });
    newManipulator.conditions = newConditions;
    _setManipulator(newManipulator);
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

        <ToEventFormsContainer
          manipulator={manipulator}
          ruleIndex={ruleIndex}
          manipulatorIndex={index}
        />

        {!!manipulator.conditions.length && (
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
                    setManipulator={_setManipulator}
                    manipulator={manipulator}
                  />
                );
              },
            )}
          </AppExpansionPanel>
        )}

        <Box marginTop={1}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => {
              addConditionToRule();
            }}
          >
            Add Condition
          </Button>
        </Box>
      </AppExpansionPanel>
    ),
    [manipulator],
  );
};

export default ManipulatorForm;
