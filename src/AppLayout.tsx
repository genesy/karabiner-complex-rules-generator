import React from 'react';
import { Container, AppBar, Typography, Toolbar } from '@material-ui/core';

import MainForm from './components/MainForm';

interface Props {}

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
