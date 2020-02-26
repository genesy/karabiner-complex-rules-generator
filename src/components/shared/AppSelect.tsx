import React, { useMemo } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { titleCase } from '../../helpers';

interface Props {
  label: string;
  value: string;
  options: any[];
  onChange: any; //TODO: event function
}

const AppSelect: React.FC<Props> = ({
  label,
  value,
  options,
  onChange = () => {},
}) => {
  return useMemo(
    () => (
      <FormControl variant="filled" fullWidth>
        <InputLabel id="type">{label}</InputLabel>
        <Select labelId="type" value={value} onChange={onChange}>
          {options.map(option => (
            <MenuItem value={option} key={option}>
              {titleCase(option)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    [label, value, options],
  );
};

export default AppSelect;
