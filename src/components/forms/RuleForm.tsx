import React, { useMemo } from 'react';
import { Typography, Box, TextField, Button } from '@material-ui/core';

import ManipulatorForm from './ManipulatorForm';
import IManipulator from '../../types/IManipulator';
import IRule from '../../types/IRule';
import _ from 'lodash';
import { withSuffix } from '../../helpers';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import { useDispatch } from 'react-redux';
import { removeRule, setRule, addManipulator } from '../../ducks/formState';

interface Props {
  rule: IRule;
  index: number;
}

const RuleForm: React.FC<Props> = ({ rule, index }) => {
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
        <Box justifyContent="flex-end">
          <Button
            variant="text"
            size="small"
            color="secondary"
            onClick={() => dispatch(removeRule(index))}
          >
            Delete Rule!
          </Button>
        </Box>
        <Box mt={2}>
          {rule.manipulators.map(
            (manipulator: IManipulator, manipulatorIndex: number) => {
              return (
                <ManipulatorForm
                  manipulator={manipulator}
                  key={manipulatorIndex}
                  index={manipulatorIndex}
                  ruleIndex={index}
                />
              );
            },
          )}
        </Box>

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => dispatch(addManipulator(index))}
          >
            Add Manipulator
          </Button>
        </Box>
      </AppExpansionPanel>
    ),
    [rule],
  );
};

export default RuleForm;
