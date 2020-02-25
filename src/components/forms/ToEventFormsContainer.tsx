import React from 'react';
import { Box, ExpansionPanelSummary, ExpansionPanel } from '@material-ui/core';

import { titleCase, suffix } from '../../helpers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ToEventForm from './ToEventForm';
import IManipulator from '../../types/IManipulator';
import IToEventDefinition from '../../types/IToEventDefinition';

const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];

interface Props {
  manipulator: IManipulator;
  setManipulator: (arg0: IManipulator) => void;
}
const ToEventFormsContainer: React.FC<Props> = ({
  manipulator,
  setManipulator,
}) => {
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
                      <ExpansionPanel key={index} defaultExpanded={index === 0}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          {index + 1}
                          {suffix(index + 1)} "{titleCase(toField)}" Event
                        </ExpansionPanelSummary>
                        <Box p={1}>
                          <ToEventForm {...toEventFormProps} />
                        </Box>
                      </ExpansionPanel>
                    );
                  },
                )}
              </Box>
            </ExpansionPanel>
          )
        );
      })}
    </Box>
  );
};

export default ToEventFormsContainer;
