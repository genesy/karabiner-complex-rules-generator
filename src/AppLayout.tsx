import React from 'react';
import { Container, AppBar, Typography, Toolbar } from '@material-ui/core';

interface Props {}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography>Karabiner Complex Modification</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
};

export default AppLayout;
