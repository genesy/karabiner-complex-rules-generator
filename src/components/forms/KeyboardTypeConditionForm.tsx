import React from 'react';
import {
  Box,
  TextField,
  ButtonGroup,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import ICondition from '../../types/ICondition';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import { withSuffix, titleCase } from '../../helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  condition: ICondition;
  setConditionState: (arg0: ICondition) => void;
}

const KeyboardTypeConditionForm: React.FC<Props> = ({
  condition,
  setConditionState,
}) => {
  return (
    <Box>
      <Box>
        <Autocomplete
          options={['ansi', 'iso', 'jis']}
          multiple
          freeSolo
          value={condition.keyboard_types}
          onChange={(_e, value) => {
            setConditionState({ ...condition, keyboard_types: value });
          }}
          autoHighlight={true}
          renderInput={params => (
            <TextField
              {...params}
              variant="filled"
              fullWidth
              label="Keyboard Type"
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default KeyboardTypeConditionForm;
