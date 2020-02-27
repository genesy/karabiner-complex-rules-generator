import React from 'react';
import { Box, TextField, ButtonGroup, Button } from '@material-ui/core';
import ICondition from '../../types/ICondition';
import AppExpansionPanel from '../shared/AppExpansionPanel';

interface Props {
  condition: ICondition;
  setConditionState: (arg0: ICondition) => void;
}

const FrontmostConditionForm: React.FC<Props> = ({
  condition,
  setConditionState,
}) => {
  const setFilePath = (bundleIndex: number, value: string) => {
    const newCondition: any = { ...condition };
    const filePaths = [...newCondition.file_paths];
    filePaths[bundleIndex] = value;
    newCondition.file_paths = filePaths;
    setConditionState(newCondition);
  };
  const setBundleIdentifier = (bundleIndex: number, value: string) => {
    const newCondition: any = { ...condition };
    const bundleIdentifiers = [...newCondition.bundle_identifiers];
    bundleIdentifiers[bundleIndex] = value;
    newCondition.bundle_identifiers = bundleIdentifiers;
    setConditionState(newCondition);
  };
  const addBundleIdentifier = () => {
    const newCondition: any = { ...condition };
    newCondition.bundle_identifiers = newCondition.bundle_identifiers || [];
    const bundleIdentifiers = [...newCondition.bundle_identifiers];
    bundleIdentifiers.push('');
    newCondition.bundle_identifiers = bundleIdentifiers;
    setConditionState(newCondition);
  };

  const addFilePath = () => {
    const newCondition: any = { ...condition };
    newCondition.file_paths = newCondition.file_paths || [];
    const filePaths = [...newCondition.file_paths];
    filePaths.push('');
    newCondition.file_paths = filePaths;
    setConditionState(newCondition);
  };

  return (
    <Box>
      <Box>
        {!!condition?.bundle_identifiers?.length && (
          <AppExpansionPanel
            panelProps={{ defaultExpanded: true }}
            title="Bundle Identifiers"
          >
            {condition.bundle_identifiers.map(
              (identifier: string, bundleIndex: number) => (
                <TextField
                  key={bundleIndex}
                  value={identifier}
                  fullWidth
                  variant="filled"
                  label={`Regex Bundle Identifier ${bundleIndex + 1}`}
                  onChange={e => {
                    setBundleIdentifier(bundleIndex, e.target.value);
                  }}
                />
              ),
            )}
          </AppExpansionPanel>
        )}
        {!!condition?.file_paths?.length && (
          <AppExpansionPanel
            panelProps={{ defaultExpanded: true }}
            title="File Paths"
          >
            {condition.file_paths.map(
              (filePath: string, filePathIndex: number) => (
                <TextField
                  key={filePathIndex}
                  value={filePath}
                  fullWidth
                  variant="filled"
                  label={`Regex File Path ${filePathIndex + 1}`}
                  onChange={e => {
                    setFilePath(filePathIndex, e.target.value);
                  }}
                />
              ),
            )}
          </AppExpansionPanel>
        )}
      </Box>
      <Box mt={2}>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={addBundleIdentifier}
          >
            Add Bundle Identifier
          </Button>
          <Button variant="contained" color="primary" onClick={addFilePath}>
            Add File Path
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default FrontmostConditionForm;
