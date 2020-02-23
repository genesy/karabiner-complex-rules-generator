import React, { useContext } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Box,
  FormControl,
  Typography,
  ButtonGroup,
  TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FromEventForm from './FromEventForm';
import FormContext from '../../context/FormContext';
import ToEventForm from './ToEventForm';
import AddIcon from '@material-ui/icons/Add';
import { suffix, titleCase } from '../../helpers';

interface Props {
  index: number;
}

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
  'event_changed_unless',
];

const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];

const RulesForm: React.FC<Props> = ({ index: ruleIndex }) => {
  const { getRuleByIndex, setRuleState } = useContext(FormContext);
  const ruleState = getRuleByIndex(ruleIndex);

  // add 'to event form'
  const addToEventForm = (type: string) => {
    const newRuleState = { ...ruleState };
    newRuleState[type] = newRuleState[type] || [];
    newRuleState[type].push({});
    setRuleState(ruleIndex, newRuleState);
  };
  return (
    <Box>
      <FormControl variant="filled" fullWidth>
        <InputLabel id="type">Type*</InputLabel>
        <Select
          labelId="type"
          value={ruleState.type}
          onChange={e => {
            setRuleState(ruleIndex, { ...ruleState, type: e.target.value });
          }}
        >
          {types.map(type => (
            <MenuItem value={type} key={type}>
              {titleCase(type)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Description (optional)"
        variant="filled"
        value={ruleState.description}
        onChange={e =>
          setRuleState(ruleIndex, { ...ruleState, description: e.target.value })
        }
        multiline
        fullWidth
      />
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          "From" Event*
        </ExpansionPanelSummary>
        <FromEventForm ruleIndex={ruleIndex} />
      </ExpansionPanel>
      {toFields.map((toField: string) => {
        return (
          ruleState[toField] && (
            <ExpansionPanel key={toField}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                "{titleCase(toField)}" Events
              </ExpansionPanelSummary>
              <Box p={2}>
                {ruleState[toField].map((to: any, index: number) => (
                  <ExpansionPanel key={index}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      {index + 1}
                      {suffix(index + 1)} "{titleCase(toField)}" Event
                    </ExpansionPanelSummary>
                    <Box p={1}>
                      <ToEventForm
                        type={toField}
                        index={index}
                        ruleIndex={ruleIndex}
                      />
                    </Box>
                  </ExpansionPanel>
                ))}
              </Box>
            </ExpansionPanel>
          )
        );
      })}

      <Box>
        {toFields.map((toField: string) => {
          return (
            <Button
              key={toField}
              variant="contained"
              color="primary"
              onClick={() => {
                addToEventForm(toField);
              }}
              startIcon={<AddIcon />}
              size="small"
            >
              {toField}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default RulesForm;
