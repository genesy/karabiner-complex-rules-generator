import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  Button,
} from '@material-ui/core';
import { titleCase } from '../../helpers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  condition: string;
  setCondition: (arg0: string) => void;
  index: number;
}

const conditionTypes: string[] = [
  'frontmost_application_if',
  'frontmost_application_unless',
];

const AddConditionForm: React.FC<Props> = ({ index }) => {
  const [condition, setCondition] = useState({
    type: '',
    bundle_identifiers: [],
    file_paths: [],
    description: '',
  });
  return (
    <ExpansionPanel defaultExpanded={index === 0}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        Condition {index + 1}
      </ExpansionPanelSummary>
      <Box p={1}>
        <FormControl fullWidth variant="filled">
          <InputLabel id="condition_type">Condition Type</InputLabel>
          <Select labelId="condition_type" value={conditionTypes[0]}>
            {conditionTypes.map(item => (
              <MenuItem value={item} key={item}>
                {titleCase(item)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          value={''}
          fullWidth
          variant="filled"
          label={`Condition Description`}
          onChange={e => {}}
        />

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            Bundle Identifiers
          </ExpansionPanelSummary>

          <Box p={1}>
            {condition.bundle_identifiers.map(identifier => (
              <TextField
                value={condition.description}
                fullWidth
                variant="filled"
                label={'Condition Description'}
                onChange={e => {}}
              />
            ))}
          </Box>
        </ExpansionPanel>
      </Box>
    </ExpansionPanel>
  );
};

export default AddConditionForm;
