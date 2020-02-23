import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MODIFIERS, KEY_CODES } from '../../constants';
import { TextField } from '@material-ui/core';
import Modifier from '../../types/Modifier';

interface Props {
  // value: Modifier[];
  value: any;
  onChange: (e: any, value: any) => void;
  modifiers?: boolean;
  keyCodes?: boolean;
  multiple?: any;
  autoHighlight?: boolean;
}

const KeyInput: React.FC<Props> = ({
  value = [],
  onChange = e => {},
  modifiers = false,
  keyCodes = false,
  multiple = true,
  autoHighlight = false,
}) => {
  let options: Modifier[] = [];
  if (keyCodes) {
    options = [...options, ...KEY_CODES];
  }
  if (modifiers) {
    options = [...options, ...MODIFIERS];
  }
  return (
    <Autocomplete
      multiple={multiple}
      freeSolo
      options={[...KEY_CODES, ...MODIFIERS]}
      getOptionLabel={(o: any) => (typeof o === 'object' ? o.label : o)}
      value={value}
      onChange={onChange}
      autoHighlight={autoHighlight}
      renderInput={params => (
        <TextField
          {...params}
          variant="filled"
          label="mandatory"
          placeholder="Modifiers"
          fullWidth
        />
      )}
    />
  );
};

export default KeyInput;
