import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MODIFIERS } from '../../constants';
import { TextField } from '@material-ui/core';
import Modifier from '../../types/Modifier';

interface Props {
  value: Modifier[];
  onChange: (e: any, value: any) => void;
}

const ModifierInput: React.FC<Props> = ({ value = [], onChange = e => {} }) => {
  return (
    <Autocomplete
      multiple
      freeSolo
      options={MODIFIERS}
      getOptionLabel={(o: any) => (typeof o === 'object' ? o.value : o)}
      value={value}
      onChange={onChange}
      renderInput={params => (
        <TextField
          {...params}
          variant="filled"
          label="mandatory"
          placeholder="Favorites"
          fullWidth
        />
      )}
    />
  );
};

export default ModifierInput;
