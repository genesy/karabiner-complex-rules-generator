import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Grid,
} from '@material-ui/core';
import Form from './components/Form';
import FormContext from './context/FormContext';

interface Props {}

const MainForm: React.FC<Props> = () => {
  const [formState, setFormState] = useState({
    type: '',
    from: {},
  });
  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      <Grid container direction="row" justify="space-between">
        <Grid item xs={6}>
          <Form />
        </Grid>
        <Grid item xs={6}>
          <textarea
            className="generated-code"
            readOnly
            value={JSON.stringify(formState, null, 2)}
          />
          >
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
