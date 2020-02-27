import React from 'react';
import {
  Box,
  TextField,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import ICondition from '../../types/ICondition';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  condition: ICondition;
  setConditionState: (arg0: ICondition) => void;
}

const EventChangedConditionForm: React.FC<Props> = ({
  condition,
  setConditionState,
}) => {
  return (
    <Box mt={2}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Value</FormLabel>
        <RadioGroup
          defaultValue="true"
          onChange={e => {
            setConditionState({ ...condition, value: e.target.value });
          }}
        >
          <FormControlLabel label="true" value="true" control={<Radio />} />
          <FormControlLabel label="false" value="false" control={<Radio />} />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default EventChangedConditionForm;
