import React from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ButtonGroup,
  Button,
  Typography,
} from '@material-ui/core';
import KeyInput from './KeyInput';
const pointingButtons: string[] = [
  'button1',
  'button2',
  'button3',
  'button4',
  'button5',
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
    <div>
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
          key_code
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
          consumer_key_code
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
        >
          Disable
        </Button>
      </ButtonGroup>
      <div>
        {showOptional.keyCode && (
          <KeyInput
            keyCodes
            modifiers
            multiple={false}
            value={eventObject.key_code}
            autoHighlight={false}
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
            label="consumer_key_code (optional)"
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
      </div>
      {/* POINTING BUTTONS */}

      <div>
        <Button
          disabled={showOptional.consumerKeyCode}
          variant="contained"
          onClick={() => {
            setShowOptional({
              ...showOptional,
              pointingButton: !showOptional.pointingButton,
            });
          }}
        >
          {showOptional.pointingButton ? 'Remove' : 'Add'} pointing_button
        </Button>

        {showOptional.pointingButton && (
          <>
            <InputLabel id="type">pointing_button</InputLabel>
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
              {pointingButtons.map(pointingButton => (
                <MenuItem value={pointingButton} key={pointingButton}>
                  {pointingButton}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      </div>
    </div>
  );
};

export default KeyCodeAndPointingButtonInput;
