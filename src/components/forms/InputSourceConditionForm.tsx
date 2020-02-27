import React from 'react';
import { Box, TextField } from '@material-ui/core';
import ICondition from '../../types/ICondition';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  condition: ICondition;
  setConditionState: (arg0: ICondition) => void;
}

const InputSourceConditionForm: React.FC<Props> = ({
  condition,
  setConditionState,
}) => {
  return <Box>Unknown</Box>;
};

export default InputSourceConditionForm;
