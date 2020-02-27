import React from 'react';
import {
  Box,
  TextField,
  ButtonGroup,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import ICondition from '../../types/ICondition';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import { withSuffix, titleCase } from '../../helpers';

interface Props {
  condition: ICondition;
  setConditionState: (arg0: ICondition) => void;
}

const DeviceIfConditionForm: React.FC<Props> = ({
  condition,
  setConditionState,
}) => {
  const addDeviceIdentifier = () => {
    const newCondition: any = { ...condition };
    newCondition.identifiers = newCondition.identifiers || [];
    const deviceIdentifiers = [...newCondition.identifiers];
    deviceIdentifiers.push('');
    newCondition.identifiers = deviceIdentifiers;
    setConditionState(newCondition);
  };

  const setIdentifier = (identifier: any, index: number) => {
    const newCondition = { ...condition };
    const newIdentifiers = [...newCondition.identifiers];
    newIdentifiers[index] = identifier;
    newCondition.identifiers = newIdentifiers;
    setConditionState(newCondition);
  };

  return (
    <Box>
      <Box>
        {!!condition?.identifiers?.length && (
          <AppExpansionPanel
            panelProps={{ defaultExpanded: true }}
            title="Device Identifiers"
          >
            {condition.identifiers.map((identifier, index: number) => (
              <AppExpansionPanel
                title={`${withSuffix(index + 1)} Device Identifier`}
                key={index}
              >
                {['vendor_id', 'product_id', 'location_id'].map(key => {
                  return (
                    <TextField
                      key={key}
                      fullWidth
                      label={titleCase(key) + ' (Optional)'}
                      variant="filled"
                      value={identifier[key]}
                      onChange={e => {
                        setIdentifier(
                          { ...identifier, [key]: e.target.value },
                          index,
                        );
                      }}
                    />
                  );
                })}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!identifier.is_keyboard}
                      onChange={e => {
                        setIdentifier(
                          { ...identifier, is_keyboard: e.target.checked },
                          index,
                        );
                      }}
                    />
                  }
                  label="Is Keyboard?"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!identifier.is_pointing_device}
                      onChange={e => {
                        setIdentifier(
                          {
                            ...identifier,
                            is_pointing_device: e.target.checked,
                          },
                          index,
                        );
                      }}
                    />
                  }
                  label="Is Pointing Device?"
                />
              </AppExpansionPanel>
            ))}
          </AppExpansionPanel>
        )}
      </Box>
      <Box mt={2}>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={addDeviceIdentifier}
          >
            Add Device Identifiers
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default DeviceIfConditionForm;
