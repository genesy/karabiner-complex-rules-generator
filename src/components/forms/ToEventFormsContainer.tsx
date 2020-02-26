import React from 'react';
import { Box } from '@material-ui/core';

import { titleCase, suffix } from '../../helpers';
import ToEventForm from './ToEventForm';
import IManipulator from '../../types/IManipulator';
import IToEventDefinition from '../../types/IToEventDefinition';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import { useDispatch } from 'react-redux';

const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];

interface Props {
  manipulator: IManipulator;
  manipulatorIndex: string;
  ruleIndex: string;
}
const ToEventFormsContainer: React.FC<Props> = ({
  manipulator,
  ruleIndex,
  manipulatorIndex,
}) => {
  const setManipulator = (a: any) => a;
  const dispatch = useDispatch();
  return (
    <Box>
      {toFields.map((toField: string, toFieldsIndex: number) => {
        return (
          manipulator[toField] && (
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
                    newManipulator[toField][index] = newToObject;
                    setManipulator(newManipulator);
                  };
                  const removeToObject = () => {
                    const newManipulator = { ...manipulator };
                    newManipulator[toField].splice(index, 1);
                    setManipulator(newManipulator);
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
    </Box>
  );
};

export default ToEventFormsContainer;
