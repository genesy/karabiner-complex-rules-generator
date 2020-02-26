import React, { ReactChild } from 'react';
import {
  Typography,
  ExpansionPanelSummary,
  ExpansionPanel,
  Box,
  TextField,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  title: any;
  children: any;
  panelProps?: any;
}

const AppExpansionPanel: React.FC<Props> = ({
  title,
  children,
  panelProps = {},
}) => {
  return (
    <ExpansionPanel
      {...panelProps}
      aria-label="Expand"
      aria-controls="additional-actions3-content"
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {title}
      </ExpansionPanelSummary>
      <Box p={2}>{children}</Box>
    </ExpansionPanel>
  );
};

export default AppExpansionPanel;
