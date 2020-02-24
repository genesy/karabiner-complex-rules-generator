import React from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ButtonGroup,
  Button,
  Typography,
  FormControl,
  Box,
} from '@material-ui/core';
import KeyInput from './KeyInput';
const pointingButtons: any[] = [
  {
    label: 'None',
    value: 'disabled',
  },
  {
    label: 'Left Click',
    value: 'button1',
  },
  {
    label: 'Right Click',
    value: 'button2',
  },
  {
    label: 'Middle Click',
    value: 'button3',
  },
  {
    label: 'Mouse 4',
    value: 'button4',
  },
  {
    label: 'Mouse 5',
    value: 'button5',
  },
];

interface Props {
  showOptional: any;
  eventObject: any;
  setShowOptional: (obj: any) => void;
  setEventObject: (obj: any) => void;
}

const KeyCodeAndPointingButtonInput: React.FC<Props> = ({
  setShowOptional = obj => {},
  showOptional = {},
  eventObject = {},
  setEventObject = obj => {},
}) => {
  return (
    <Box marginBottom={2}>
      {/* KEY CODES  */}
      <ButtonGroup>
        <Button
          disabled={showOptional.keyCode}
          variant="contained"
          onClick={() => {
            setShowOptional({
              ...showOptional,
              keyCode: true,
              consumerKeyCode: false,
            });
          }}
        >
          Key Code
        </Button>
        <Button
          disabled={showOptional.consumerKeyCode}
          variant="contained"
          onClick={() => {
            setShowOptional({
              ...showOptional,
              keyCode: false,
              consumerKeyCode: true,
            });
          }}
        >
          Consumer Key Code
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowOptional({
              ...showOptional,
              keyCode: false,
              consumerKeyCode: false,
            });
          }}
          disabled={!(showOptional.keyCode || showOptional.consumerKeyCode)}
          color="secondary"
        >
          Disable
        </Button>
      </ButtonGroup>
      <Box marginBottom={1}>
        {showOptional.keyCode && (
          <KeyInput
            keyCodes
            modifiers
            multiple={false}
            value={eventObject.key_code}
            autoHighlight={false}
            label="Key Code (optional)"
            onChange={(_e: any, v: any) => {
              setEventObject({
                ...eventObject,
                key_code: typeof v === 'string' ? { label: v, value: v } : v,
              });
            }}
          />
        )}
        {showOptional.consumerKeyCode && (
          <TextField
            placeholder=""
            margin="normal"
            variant="filled"
            label="Consumer Key Code (optional)"
            fullWidth
            value={eventObject.consumer_key_code || ''}
            onChange={e =>
              setEventObject({
                ...eventObject,
                consumer_key_code: e.currentTarget.value,
              })
            }
          />
        )}
      </Box>

      <Box>
        <FormControl variant="filled" fullWidth>
          <InputLabel id="type">Pointing Button (optional)</InputLabel>
          <Select
            labelId="type"
            value={eventObject.pointing_button || ''}
            onChange={(event: any) => {
              setEventObject({
                ...eventObject,
                pointing_button: event.target.value || '',
              });
            }}
          >
            {pointingButtons.map(({ label, value }) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default KeyCodeAndPointingButtonInput;
