import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import { titleCase } from '../../helpers';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import IManipulator from '../../types/IManipulator';

interface Props {
  condition: any;
  index: number;
  setManipulator: (arg0: IManipulator) => void;
  manipulator: IManipulator;
}

const conditionTypes: string[] = [
  'frontmost_application_if',
  'frontmost_application_unless',
];

const AddConditionForm: React.FC<Props> = ({
  condition,
  index,
  setManipulator,
  manipulator,
}) => {
  const setConditionState = (condition: any) => {
    const newManipulator = { ...manipulator };
    newManipulator.conditions = [...manipulator.conditions];
    newManipulator.conditions[index] = condition;
    setManipulator(newManipulator);
  };

  const [showOptional, setShowOptional] = useState({
    description: false,
  });

  const addBundleIdentifier = () => {
    const newCondition: any = { ...condition };
    newCondition.bundle_identifiers = newCondition.bundle_identifiers || [];
    newCondition.bundle_identifiers.push('');
    setConditionState(newCondition);
  };

  const addFilePath = () => {
    const newCondition: any = { ...condition };
    newCondition.file_paths = newCondition.file_paths || [];
    newCondition.file_paths.push('');
    setConditionState(newCondition);
  };

  const setFilePath = (bundleIndex: number, value: string) => {
    const newCondition: any = { ...condition };
    const filePaths = [...newCondition.file_paths];
    filePaths[bundleIndex] = value;
    newCondition.bundle_identifiers = filePaths;
    setConditionState(newCondition);
  };
  const setBundleIdentifier = (bundleIndex: number, value: string) => {
    const newCondition: any = { ...condition };
    const bundleIdentifiers = [...newCondition.bundle_identifiers];
    bundleIdentifiers[bundleIndex] = value;
    newCondition.bundle_identifiers = bundleIdentifiers;
    setConditionState(newCondition);
  };

  return (
    <AppExpansionPanel
      panelProps={{ defaultExpanded: index === 0 }}
      title={`Condition ${index + 1}`}
    >
      <FormControl fullWidth variant="filled">
        <InputLabel id="condition_type">Condition Type</InputLabel>
        <Select
          labelId="condition_type"
          value={condition.type}
          onChange={e => {
            setConditionState({ ...condition, type: e.target.value });
          }}
        >
          {conditionTypes.map(item => (
            <MenuItem value={item} key={item}>
              {titleCase(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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

      {showOptional.description && (
        <TextField
          fullWidth
          variant="filled"
          label={`Condition Description (optional)`}
          value={condition.description}
          onChange={e => {
            setConditionState({ ...condition, description: e.target.value });
          }}
        />
      )}

      <Button onClick={addBundleIdentifier}>Add Bundle Identifier</Button>
      <Button onClick={addFilePath}>Add File Path</Button>
      <Button
        onClick={() =>
          setShowOptional({
            ...showOptional,
            description: !showOptional.description,
          })
        }
      >
        {showOptional.description ? 'Remove' : 'Add'} Description
      </Button>
    </AppExpansionPanel>
  );
};

export default AddConditionForm;
