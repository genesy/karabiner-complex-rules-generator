import React from 'react';
import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Grid,
} from '@material-ui/core';

import MainForm from './components/MainForm';

interface Props {}

const AppLayout: React.FC<Props> = () => {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Grid xs>
              <Typography>
                Karabiner Complex Modification | Still a work in progress
              </Typography>
            </Grid>
            <Grid xs={3} container justify="space-evenly">
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
              <a
                className="github-button"
                href="https://github.com/genesy"
                data-size="large"
                data-show-count="true"
                aria-label="Follow @genesy on GitHub"
              >
                Follow @genesy
              </a>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <MainForm />
    </>
  );
};

export default AppLayout;
