import React, { useContext, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';

import FormContext from '../../context/FormContext';
import ManipulatorForm from './ManipulatorForm';
import IManipulator from '../../types/IManipulator';
import IRule from '../../types/IRule';

interface Props {
  rule: IRule;
}

const RulesForm: React.FC<Props> = ({ rule }) => {
  const { setRuleState } = useContext(FormContext);

  return (
    <Box>
      <TextField
        label="Description (optional)"
        variant="filled"
        value={rule.description}
        onChange={e => setRuleState(rule, { description: e.target.value })}
        multiline
        fullWidth
      />
      {rule.manipulators.map((manipulator: IManipulator, index: number) => {
        return <ManipulatorForm manipulator={manipulator} key={index} />;
      })}

      <Button>Add Manipulator</Button>
    </Box>
  );
};

export default RulesForm;
