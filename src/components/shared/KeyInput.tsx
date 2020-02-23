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
  label?: string;
}

const KeyInput: React.FC<Props> = ({
  value = [],
  onChange = e => {},
  modifiers = false,
  keyCodes = false,
  multiple = true,
  autoHighlight = false,
  freeSolo = true,
  label = 'keys',
}) => {
  let options: Modifier[] = [];
  let placeholderText: string[] = [];
  if (keyCodes) {
    options = [...options, ...KEY_CODES];
    placeholderText.push('Key Codes');
  }
  if (modifiers) {
    options = [...options, ...MODIFIERS];
    placeholderText.push('Modifiers');
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
          label={label}
          placeholder={placeholderText.join(', ')}
          fullWidth
        />
      )}
    />
  );
};

export default KeyInput;
