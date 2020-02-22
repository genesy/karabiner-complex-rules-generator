import React from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {}

const types: string[] = [
  'basic',
  'frontmost_application_if',
  'frontmost_application_unless',
  'device_if',
  'device_unless',
  'keyboard_type_if',
  'keyboard_type_unless',
  'input_source_if',
  'input_source_unless',
  'variable_if',
  'variable_unless',
  'event_changed_if',
  'event_changed_unless'
];

const optionalBoolean: string[] = ['unset', 'true', 'false'];
const keyOrder: string[] = ['unset', 'insensitive', 'strict', 'strict_inverse'];
const keyUpWhen: string[] = ['unset', 'any', 'all'];

const FromForm: React.FC<Props> = () => {
  return (
    <div>
      <TextField placeholder="key_code (optional)" />
      <TextField placeholder="consumer_key_code (optional)" />
      <TextField placeholder="pointing_button (optional)" />
      <div>
        Modifiers mandatory
        <Autocomplete
          multiple
          freeSolo
          options={[]}
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
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          renderInput={params => (
            <TextField
              {...params}
              variant="filled"
              label="optional"
              placeholder="Favorites"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        Simultaneous
        <Button>Add key_code</Button>
        <Button>Add consumer_key_code</Button>
        <Button>Add pointing_buttone</Button>
      </div>
      <div>
        Simultaneous Options
        <InputLabel id="detect_key_down_uninterruptedly">
          detect_key_down_uninterruptedly
        </InputLabel>
        <Select
          labelId="detect_key_down_uninterruptedly"
          value={optionalBoolean[0]}
        >
          {optionalBoolean.map(item => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="key_down_order">key_down_order</InputLabel>
        <Select labelId="key_down_order" value={keyOrder[0]}>
          {keyOrder.map(item => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="key_up_order">key_up_order</InputLabel>
        <Select labelId="key_uporder" value={keyOrder[0]}>
          {keyOrder.map(item => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

const Form: React.FC<Props> = () => {
  return (
    <div>
      <InputLabel id="type">type</InputLabel>
      <Select labelId="type" value={types[0]}>
        {types.map(type => (
          <MenuItem value={type} key={type}>
            {type}
          </MenuItem>
        ))}
      </Select>

      <div>From</div>
      <FromForm />
    </div>
  );
};

export default Form;
