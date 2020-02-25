import React, { useContext, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';

import FormContext from '../../context/FormContext';
import ManipulatorForm from './ManipulatorForm';
import IManipulator from '../../types/IManipulator';

interface Props {
  rule: any;
}

const RulesForm: React.FC<Props> = ({ rule: ruleState }) => {
  const { setRuleState } = useContext(FormContext);

  return (
    <Box>
      <TextField
        label="Description (optional)"
        variant="filled"
        value={ruleState.description}
        onChange={e =>
          setRuleState({ ...ruleState, description: e.target.value })
        }
        multiline
        fullWidth
      />
      {ruleState.manipulators.map(
        (manipulator: IManipulator, index: number) => {
          return <ManipulatorForm manipulator={manipulator} key={index} />;
        },
      )}

      <Button>Add Manipulator</Button>
    </Box>
  );
};

export default RulesForm;
