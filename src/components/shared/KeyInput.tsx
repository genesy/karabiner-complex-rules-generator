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
  freeSolo?: boolean;
}

const KeyInput: React.FC<Props> = ({
  value = [],
  onChange = e => {},
  modifiers = false,
  keyCodes = false,
  multiple = true,
  autoHighlight = false,
  freeSolo = true,
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
      freeSolo={freeSolo}
      options={options}
      getOptionLabel={(o: any) => (typeof o === 'object' ? o.label : o) || ''}
      value={value}
      onChange={onChange}
      autoHighlight={autoHighlight}
      renderInput={params => (
        <TextField
          {...params}
          variant="filled"
          label="Keys"
          placeholder="Keys"
          fullWidth
        />
      )}
    />
  );
};

export default KeyInput;
