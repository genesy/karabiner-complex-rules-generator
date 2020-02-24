import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  Button,
} from '@material-ui/core';
import { titleCase } from '../../helpers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  setRuleState: (i: number, obj: any) => void;
  index: number;
  ruleIndex: number;
  ruleState: any;
}

const conditionTypes: string[] = [
  'frontmost_application_if',
  'frontmost_application_unless',
];

const AddConditionForm: React.FC<Props> = ({
  index,
  setRuleState,
  ruleIndex,
  ruleState,
}) => {
  const [condition, setCondition] = useState({
    type: '',
    bundle_identifiers: [],
    file_paths: [],
    description: '',
  });

  const [showOptional, setShowOptional] = useState({
    description: false,
  });

  const addBundleIdentifier = () => {
    const newCondition: any = { ...condition };
    newCondition.bundle_identifiers.push('');
    setCondition(newCondition);
  };

  const addFilePath = () => {
    const newCondition: any = { ...condition };
    newCondition.file_paths.push('');
    setCondition(newCondition);
  };

  const setFilePath = (bundleIndex: number, value: string) => {
    const newCondition: any = { ...condition };
    newCondition.file_paths[bundleIndex] = value;
    setCondition(newCondition);
  };
  const setBundleIdentifier = (bundleIndex: number, value: string) => {
    const newCondition: any = { ...condition };
    newCondition.bundle_identifiers[bundleIndex] = value;
    setCondition(newCondition);
  };

  useEffect(() => {
    const newConditions = [...ruleState.conditions];
    newConditions[index] = condition;
    setRuleState(ruleIndex, { ...ruleState, conditions: newConditions });
  }, [condition]);

  return (
    <ExpansionPanel defaultExpanded={index === 0}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        Condition {index + 1}
      </ExpansionPanelSummary>
      <Box p={1}>
        <FormControl fullWidth variant="filled">
          <InputLabel id="condition_type">Condition Type</InputLabel>
          <Select labelId="condition_type" value={conditionTypes[0]}>
            {conditionTypes.map(item => (
              <MenuItem value={item} key={item}>
                {titleCase(item)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {!!condition.bundle_identifiers.length && (
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              Bundle Identifiers
            </ExpansionPanelSummary>

            <Box p={1}>
              {condition.bundle_identifiers.map((identifier, bundleIndex) => (
                <TextField
                  value={identifier}
                  fullWidth
                  variant="filled"
                  label={`Regex Bundle Identifier ${bundleIndex + 1}`}
                  onChange={e => {
                    setBundleIdentifier(bundleIndex, e.target.value);
                  }}
                />
              ))}
            </Box>
          </ExpansionPanel>
        )}
        {!!condition.file_paths.length && (
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              File Paths
            </ExpansionPanelSummary>

            <Box p={1}>
              {condition.file_paths.map((filePath, filePathIndex) => (
                <TextField
                  value={filePath}
                  fullWidth
                  variant="filled"
                  label={`Regex File Path ${filePathIndex + 1}`}
                  onChange={e => {
                    setFilePath(filePathIndex, e.target.value);
                  }}
                />
              ))}
            </Box>
          </ExpansionPanel>
        )}

        {showOptional.description && (
          <TextField
            fullWidth
            variant="filled"
            label={`Condition Description (optional)`}
            value={condition.description}
            onChange={e => {
              setCondition({ ...condition, description: e.target.value });
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
      </Box>
    </ExpansionPanel>
  );
};

export default AddConditionForm;
