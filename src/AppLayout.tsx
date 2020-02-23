import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import RulesForm from './components/RulesForm';
import FormContext from './context/FormContext';

interface Props {}
interface FormState {
  title: string;
  rules: any[];
}

const MainForm: React.FC<Props> = () => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    rules: [],
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
    const initialRule = {
      type: 'basic',
      from: {},
    };
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
        <Grid item xs={6}>
          <TextField
            fullWidth
            onChange={e =>
              setFormState({ ...formState, title: e.currentTarget.value })
            }
          />
          <Button onClick={addRule}>Add Rule</Button>
          {formState.rules.map((rule, index) => (
            <RulesForm index={index} key={index} />
          ))}
        </Grid>
        <Grid item xs={6}>
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

const AppLayout: React.FC<Props> = () => {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography>Karabiner Complex Modification</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <MainForm />
    </>
  );
};

export default AppLayout;
