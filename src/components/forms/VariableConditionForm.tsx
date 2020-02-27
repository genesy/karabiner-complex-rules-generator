import React from 'react';
import { Box, TextField } from '@material-ui/core';
import ICondition from '../../types/ICondition';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  condition: ICondition;
  setConditionState: (arg0: ICondition) => void;
}

const VariableConditionForm: React.FC<Props> = ({
  condition,
  setConditionState,
}) => {
  return (
    <Box>
      <TextField
        fullWidth
        label="Variable Name"
        variant="filled"
        value={condition.name}
        onChange={e => {
          setConditionState({ ...condition, name: e.target.value });
        }}
      />
      <TextField
        fullWidth
        label="Variable Value"
        variant="filled"
        value={condition.value}
        onChange={e => {
          setConditionState({ ...condition, value: e.target.value });
        }}
      />
    </Box>
  );
};

export default VariableConditionForm;
