import React from 'react';
import { Box, Button, ButtonGroup } from '@material-ui/core';

import { titleCase, suffix } from '../../helpers';
import ToEventForm from './ToEventForm';
import IManipulator from '../../types/IManipulator';
import IToEventDefinition from '../../types/IToEventDefinition';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import { useDispatch } from 'react-redux';
import { setManipulator, addToObject } from '../../ducks/formState';

const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];

const toDelayedAction: string[] = ['to_if_invoked', 'to_if_canceled'];

interface Props {
  manipulator: IManipulator;
  manipulatorIndex: number;
  ruleIndex: number;
}

const TheForm = ({
  to,
  index,
  toField,
  manipulator,
  ruleIndex,
  manipulatorIndex,
}: {
  to: IToEventDefinition;
  index: number;
  toField: string;
  manipulator: IManipulator;
  ruleIndex: number;
  manipulatorIndex: number;
}) => {
  const toObject = { ...to };
  const dispatch = useDispatch();

  const _setManipulator = (newManipulator: IManipulator) =>
    dispatch(
      setManipulator({
        manipulator: newManipulator,
        ruleIndex,
        index: manipulatorIndex,
      }),
    );
  const setToObject = (newToObject: IToEventDefinition) => {
    const newManipulator = { ...manipulator };
    if (toDelayedAction.includes(toField)) {
      const _toDelayedAction = { ...newManipulator.to_delayed_action };
      _toDelayedAction[toField] = [..._toDelayedAction[toField]];
      _toDelayedAction[toField][index] = newToObject;
      newManipulator.to_delayed_action = _toDelayedAction;
    } else {
      const _toField = [...newManipulator[toField]];
      _toField[index] = newToObject;
      newManipulator[toField] = _toField;
    }
    _setManipulator(newManipulator);
  };
  const removeToObject = () => {
    const newManipulator = { ...manipulator };
    if (toDelayedAction.includes(toField)) {
      const _toDelayedAction = { ...newManipulator.to_delayed_action };
      _toDelayedAction[toField] = [..._toDelayedAction[toField]];
      _toDelayedAction[toField].splice(index, 1);
      newManipulator.to_delayed_action = _toDelayedAction;
    } else {
      const _toField = [...newManipulator[toField]];
      _toField.splice(index, 1);
      newManipulator[toField] = _toField;
    }
    _setManipulator(newManipulator);
  };

  const toEventFormProps = {
    toObject,
    setToObject,
    removeToObject,
    index,
    toField,
  };
  return <ToEventForm {...toEventFormProps} key={index} />;
};
const ToEventFormsContainer: React.FC<Props> = ({
  manipulator,
  ruleIndex,
  manipulatorIndex,
}) => {
  const dispatch = useDispatch();
  const addToEventForm = (toField: string) => {
    dispatch(addToObject({ manipulatorIndex, ruleIndex, toField }));
  };
  return (
    <Box>
      {toFields.map((toField: string, toFieldsIndex: number) => {
        return (
          <Box mb={2}>
            <AppExpansionPanel
              key={toFieldsIndex}
              title={`${manipulator[toField].length} "${titleCase(
                toField,
              )}" Events`}
            >
              {manipulator[toField].map(
                (to: IToEventDefinition, index: number) => {
                  return (
                    <TheForm
                      to={to}
                      index={index}
                      toField={toField}
                      key={index}
                      ruleIndex={ruleIndex}
                      manipulatorIndex={manipulatorIndex}
                      manipulator={manipulator}
                    />
                  );
                },
              )}
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addToEventForm(toField);
                  }}
                  fullWidth
                >
                  add {toField} event
                </Button>
              </Box>
            </AppExpansionPanel>
          </Box>
        );
      })}

      <AppExpansionPanel
        title={`${manipulator.to_delayed_action.to_if_canceled.length +
          manipulator.to_delayed_action.to_if_invoked
            .length} "To Delayed Action" Events`}
      >
        {toDelayedAction.map((toField: string) => {
          return (
            <AppExpansionPanel
              key={toField}
              title={`${
                manipulator.to_delayed_action[toField].length
              } "${titleCase(toField)}" Events`}
            >
              {manipulator.to_delayed_action[toField].map(
                (to: IToEventDefinition, index: number) => {
                  return (
                    <TheForm
                      to={to}
                      index={index}
                      toField={toField}
                      key={index}
                      ruleIndex={ruleIndex}
                      manipulatorIndex={manipulatorIndex}
                      manipulator={manipulator}
                    />
                  );
                },
              )}
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    addToEventForm(toField);
                  }}
                >
                  Add {toField} Event
                </Button>
              </Box>
            </AppExpansionPanel>
          );
        })}
      </AppExpansionPanel>
    </Box>
  );
};

export default ToEventFormsContainer;
