import React from 'react';
import { Box } from '@material-ui/core';

import { titleCase, suffix } from '../../helpers';
import ToEventForm from './ToEventForm';
import IManipulator from '../../types/IManipulator';
import IToEventDefinition from '../../types/IToEventDefinition';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import { useDispatch } from 'react-redux';
import { setManipulator } from '../../ducks/formState';

const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];

interface Props {
  manipulator: IManipulator;
  manipulatorIndex: number;
  ruleIndex: number;
}
const ToEventFormsContainer: React.FC<Props> = ({
  manipulator,
  ruleIndex,
  manipulatorIndex,
}) => {
  const dispatch = useDispatch();
  const _setManipulator = (newManipulator: IManipulator) =>
    dispatch(
      setManipulator({
        manipulator: newManipulator,
        ruleIndex,
        index: manipulatorIndex,
      }),
    );
  return (
    <Box>
      {toFields.map((toField: string, toFieldsIndex: number) => {
        return (
          !!manipulator[toField]?.length && (
            <AppExpansionPanel
              key={toFieldsIndex}
              panelProps={{ defaultExpanded: true }}
              title={`"${titleCase(toField)}" Events`}
            >
              {manipulator[toField].map(
                (to: IToEventDefinition, index: number) => {
                  const toObject = { ...to };
                  const setToObject = (newToObject: IToEventDefinition) => {
                    const newManipulator = { ...manipulator };
                    const _toField = [...newManipulator[toField]];
                    _toField[index] = newToObject;
                    newManipulator[toField] = _toField;
                    _setManipulator(newManipulator);
                  };
                  const removeToObject = () => {
                    const newManipulator = { ...manipulator };
                    const _toField = [...newManipulator[toField]];
                    _toField.splice(index, 1);
                    newManipulator[toField] = _toField;
                    _setManipulator(newManipulator);
                  };

                  const toEventFormProps = {
                    toObject,
                    setToObject,
                    removeToObject,
                  };
                  return (
                    <AppExpansionPanel
                      key={index}
                      panelProps={{ defaultExpanded: index === 0 }}
                      title={`${index + 1}${suffix(index + 1)} "${titleCase(
                        toField,
                      )}" Event`}
                    >
                      <ToEventForm {...toEventFormProps} />
                    </AppExpansionPanel>
                  );
                },
              )}
            </AppExpansionPanel>
          )
        );
      })}
      {manipulator.to_delayed_action.to_if_canceled && (
        <AppExpansionPanel title="to_if_canceled">
          {manipulator.to_delayed_action.to_if_canceled.map(
            (toObject: IToEventDefinition, index: number) => {
              const setToObject = (newToObject: IToEventDefinition) => {
                const newManipulator = { ...manipulator };
                const _toField = [
                  ...newManipulator.to_delayed_action.to_if_canceled,
                ];
                _toField[index] = newToObject;
                newManipulator.to_delayed_action.to_if_canceled = _toField;
                _setManipulator(newManipulator);
              };
              const removeToObject = () => {
                const newManipulator = { ...manipulator };
                const _toField = [
                  ...newManipulator.to_delayed_action.to_if_canceled,
                ];
                _toField.splice(index, 1);
                newManipulator.to_delayed_action.to_if_canceled = _toField;
                _setManipulator(newManipulator);
              };

              const toEventFormProps = {
                toObject,
                setToObject,
                removeToObject,
              };
              return <ToEventForm {...toEventFormProps} />;
            },
          )}
        </AppExpansionPanel>
      )}
    </Box>
  );
};

export default ToEventFormsContainer;
