import React, { useContext, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';

import FormContext from '../../context/FormContext';
import ManipulatorForm from './ManipulatorForm';
import IManipulator from '../../types/IManipulator';
import IRule from '../../types/IRule';
import _ from 'lodash';

interface Props {
  rule: IRule;
  setRule: (arg0: IRule) => void;
}

const RuleForm: React.FC<Props> = ({ rule, setRule }) => {
  const setManipulator = (newManipulator: IManipulator) => {
    const index = _.findIndex(rule.manipulators, { _id: newManipulator._id });
    const newRule = { ...rule };
    newRule.manipulators[index] = { ...newManipulator };
    setRule(newRule);
  };
  return (
    <Box>
      <TextField
        label="Description (optional)"
        variant="filled"
        value={rule.description}
        onChange={e => setRule({ ...rule, description: e.target.value })}
        multiline
        fullWidth
      />
      {rule.manipulators.map((manipulator: IManipulator, index: number) => {
        return (
          <ManipulatorForm
            manipulator={manipulator}
            key={index}
            setManipulator={setManipulator}
          />
        );
      })}

      <Button>Add Manipulator</Button>
    </Box>
  );
};

export default RuleForm;
