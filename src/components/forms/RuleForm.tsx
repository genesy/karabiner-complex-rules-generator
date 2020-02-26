import React, { useMemo } from 'react';
import { Typography, Box, TextField, Button } from '@material-ui/core';

import ManipulatorForm from './ManipulatorForm';
import IManipulator from '../../types/IManipulator';
import IRule from '../../types/IRule';
import _ from 'lodash';
import { withSuffix } from '../../helpers';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import { useDispatch } from 'react-redux';
import { removeRule, setRule } from '../../ducks/formState';

interface Props {
  rule: IRule;
  index: number;
}

const RuleForm: React.FC<Props> = ({ rule, index }) => {
  // const setManipulator = (newManipulator: IManipulator) => {
  //   const manipulatorIndex = _.findIndex(rule.manipulators, { _id: newManipulator._id });
  //   const newRule = { ...rule };
  //   newRule.manipulators[index] = { ...newManipulator };
  //   setRule(index, newRule);
  // };
  const dispatch = useDispatch();
  return useMemo(
    () => (
      <AppExpansionPanel
        title={
          <TextField
            label={`${withSuffix(index + 1)} Rule Description`}
            value={rule.description}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            onChange={e =>
              dispatch(setRule(index, { ...rule, description: e.target.value }))
            }
            multiline
            fullWidth
          />
        }
        panelProps={{ defaultExpanded: index === 0 }}
      >
        <Box>
          {rule.manipulators.map(
            (manipulator: IManipulator, manipulatorIndex: number) => {
              return (
                <ManipulatorForm
                  manipulator={manipulator}
                  key={index}
                  index={manipulatorIndex}
                  ruleIndex={index}
                />
              );
            },
          )}
        </Box>

        <Button>Add Manipulator</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(removeRule(index))}
        >
          Delete Rule! cannot be undone
        </Button>
      </AppExpansionPanel>
    ),
    [rule],
  );
};

export default RuleForm;
