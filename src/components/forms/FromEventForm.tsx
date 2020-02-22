import React, { useState } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ButtonGroup,
  Button,
  Typography,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

const optionalBoolean: string[] = ['unset', 'true', 'false'];
const keyOrder: string[] = ['unset', 'insensitive', 'strict', 'strict_inverse'];
const keyUpWhen: string[] = ['unset', 'any', 'all'];
const pointButtons: string[] = [
  'button1',
  'button2',
  'button3',
  'button4',
  'button5',
];

interface Props {}

const FromEventForm: React.FC<Props> = () => {
  const [showOptional, setShowOptional] = useState({
    keyCode: false,
    consumerKeyCode: false,
    pointingButton: false,
    modifiersMandatory: false,
    modifiersOptional: false,
    simultaneous: false,
    simultaneousOptions: false,
  });
  return (
    <div className="form-container">
      <Typography variant="h4">From</Typography>
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
          <TextField
            placeholder=""
            margin="normal"
            variant="filled"
            label="key_code (optional)"
            fullWidth
          />
        )}
        {showOptional.consumerKeyCode && (
          <TextField
            placeholder=""
            margin="normal"
            variant="filled"
            label="consumer_key_code (optional)"
            fullWidth
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
          {showOptional.pointingButton ? 'Hide' : 'Show'} pointing_button
        </Button>

        {showOptional.pointingButton && (
          <Autocomplete
            multiple
            options={pointButtons}
            renderInput={params => (
              <TextField
                {...params}
                variant="filled"
                label="mandatory"
                placeholder="Favorites"
                fullWidth
              />
            )}
          />
        )}
      </div>
      <div>
        <Typography variant="h5">Modifiers</Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setShowOptional({
                ...showOptional,
                modifiersMandatory: !showOptional.modifiersMandatory,
              });
            }}
          >
            {showOptional.modifiersMandatory ? 'Hide' : 'Show'} Mandatory
          </Button>
          {showOptional.modifiersMandatory && (
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="filled"
                  label="mandatory"
                  placeholder="Favorites"
                  fullWidth
                />
              )}
            />
          )}
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setShowOptional({
                ...showOptional,
                modifiersOptional: !showOptional.modifiersOptional,
              });
            }}
          >
            {showOptional.modifiersOptional ? 'Hide' : 'Show'} Optional
          </Button>
          {showOptional.modifiersOptional && (
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="filled"
                  label="optional"
                  placeholder="Favorites"
                  fullWidth
                />
              )}
            />
          )}
        </div>
      </div>
      <div>
        <Typography variant="h5">Simultaneous</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setShowOptional({
              ...showOptional,
              simultaneous: !showOptional.simultaneous,
            });
          }}
        >
          {showOptional.simultaneous ? 'Hide' : 'Show'} Simultaneous
        </Button>
        {showOptional.simultaneous && (
          <div>
            <Button>Add key_code</Button>
            <Button>Add consumer_key_code</Button>
            <Button>Add pointing_buttone</Button>

            <div>
              Simultaneous Options
              <InputLabel id="detect_key_down_uninterruptedly">
                detect_key_down_uninterruptedly
              </InputLabel>
              <Select
                labelId="detect_key_down_uninterruptedly"
                value={optionalBoolean[0]}
              >
                {optionalBoolean.map(item => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id="key_down_order">key_down_order</InputLabel>
              <Select labelId="key_down_order" value={keyOrder[0]}>
                {keyOrder.map(item => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id="key_up_order">key_up_order</InputLabel>
              <Select labelId="key_uporder" value={keyOrder[0]}>
                {keyOrder.map(item => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FromEventForm;
