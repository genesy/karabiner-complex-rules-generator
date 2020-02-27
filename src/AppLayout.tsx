import React from 'react';
import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Box,
} from '@material-ui/core';

import MainForm from './components/MainForm';

interface Props {}

const AppLayout: React.FC<Props> = () => {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar variant="dense">
            <Grid xs item>
              <Typography>
                Karabiner Complex Modification | Still a work in progress
              </Typography>
            </Grid>
            <Grid xs={3} item container justify="flex-end">
              <a
                className="github-button"
                href="https://github.com/genesy/karabiner-complex-rules-generator"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star genesy/karabiner-complex-rules-generator on GitHub"
              >
                Star
              </a>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Box marginTop={1}>
        <MainForm />
      </Box>
    </>
  );
};

export default AppLayout;
