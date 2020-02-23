import React, { useState } from 'react';
import RulesForm from './forms/RulesForm';
import FormContext from '../context/FormContext';
import {
  Grid,
  Button,
  TextField,
  Box,
  ExpansionPanelSummary,
  ExpansionPanel,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { suffix, titleCase } from '../helpers';

interface Props {}
interface FormState {
  title: string;
  rules: any[];
}

const initialRule = {
  type: 'basic',
  from: {},
};
const MainForm: React.FC<Props> = () => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    rules: [initialRule],
  });

  const setRuleState = (index: number, rule: any = {}) => {
    const newFormState = { ...formState };
    const newRules = [...formState.rules];
    newRules[index] = { ...rule };
    newFormState.rules = newRules;
    setFormState(newFormState);
  };

  const getRuleByIndex = (index: number): any => formState.rules[index];

  const addRule = () => {
    setFormState({ ...formState, rules: [...formState.rules, initialRule] });
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        setFormState,
        setRuleState,
        getRuleByIndex,
      }}
    >
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Box p={1}>
            <TextField
              fullWidth
              onChange={e =>
                setFormState({ ...formState, title: e.currentTarget.value })
              }
              variant="filled"
              label="Title"
            />
            {formState.rules.map((rule, index) => (
              <ExpansionPanel defaultExpanded={index === 0}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  {index +
                    1 +
                    suffix(index + 1) +
                    ' Rule' +
                    (rule.description ? ': ' + rule.description : '')}
                </ExpansionPanelSummary>
                <Box p={1}>
                  <RulesForm index={index} key={index} />
                </Box>
              </ExpansionPanel>
            ))}

            <Button
              onClick={addRule}
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Rule
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4} container>
          <textarea
            className="generated-code"
            readOnly
            value={JSON.stringify(formState, null, 2)}
          />
        </Grid>
      </Grid>
    </FormContext.Provider>
  );
};
export default MainForm;
