import React, {
  useState,
  useContext,
  useEffect,
  EventHandler,
  ChangeEvent,
} from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ButtonGroup,
  Button,
  Typography,
  Chip,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import FormContext from '../../context/FormContext';
import IFromEventDefinition from '../../types/IFromEventDefinition';
import { MODIFIERS } from '../../constants';
import Modifier from '../../types/Modifier';
import ModifierInput from '../shared/ModifierInput';

const optionalBoolean: string[] = ['unset', 'true', 'false'];
const keyOrder: string[] = ['unset', 'insensitive', 'strict', 'strict_inverse'];
const keyUpWhen: string[] = ['unset', 'any', 'all'];
const pointingButtons: string[] = [
  'button1',
  'button2',
  'button3',
  'button4',
  'button5',
];

interface Props {}

const FromEventForm: React.FC<Props> = () => {
  const { formState, setFormState } = useContext(FormContext);
  const [fromObject, setFromObject] = useState<IFromEventDefinition>({
    pointing_button: 'button1',
    modifiers: {
      mandatory: [],
      optional: [],
    },
  });

  const [showOptional, setShowOptional] = useState({
    keyCode: false,
    consumerKeyCode: false,
    pointingButton: false,
    modifiersMandatory: false,
    modifiersOptional: false,
    simultaneous: false,
    simultaneousOptions: false,
  });

  useEffect(() => {
    const newFromObject: any = {
      ...fromObject,
      modifiers: { ...fromObject.modifiers },
    };
    if (!showOptional.keyCode && newFromObject.key_code) {
      delete newFromObject.key_code;
    }
    if (!showOptional.consumerKeyCode && newFromObject.consumer_key_code) {
      delete newFromObject.consumer_key_code;
    }
    if (!showOptional.pointingButton) {
      delete newFromObject.pointing_button;
    }
    if (!showOptional.modifiersMandatory && newFromObject.modifiers.mandatory) {
      delete newFromObject.modifiers.mandatory;
    } else {
      newFromObject.modifiers.mandatory = newFromObject.modifiers.mandatory.map(
        (m: Modifier) => m.value,
      );
    }

    if (!showOptional.modifiersOptional && newFromObject.modifiers?.optional) {
      delete newFromObject.modifiers.optional;
    } else {
      newFromObject.modifiers.optional = newFromObject.modifiers.optional.map(
        (m: Modifier) => m.value,
      );
    }
    if (
      !newFromObject.modifiers.mandatory &&
      !newFromObject.modifiers.optional
    ) {
      delete newFromObject.modifiers;
    }

    setFormState({ ...formState, from: newFromObject });
  }, [fromObject, showOptional]);

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
            value={fromObject.key_code || ''}
            onChange={e =>
              setFromObject({ ...fromObject, key_code: e.currentTarget.value })
            }
          />
        )}
        {showOptional.consumerKeyCode && (
          <TextField
            placeholder=""
            margin="normal"
            variant="filled"
            label="consumer_key_code (optional)"
            fullWidth
            value={fromObject.consumer_key_code || ''}
            onChange={e =>
              setFromObject({
                ...fromObject,
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
          {showOptional.pointingButton ? 'Hide' : 'Show'} pointing_button
        </Button>

        {showOptional.pointingButton && (
          <>
            <InputLabel id="type">pointing_button</InputLabel>
            <Select
              labelId="type"
              value={fromObject.pointing_button || ''}
              onChange={(event: any) => {
                console.log(event);
                setFromObject({
                  ...fromObject,
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
            // TODO: separate to own component to reuse
            <ModifierInput
              value={fromObject.modifiers.mandatory}
              onChange={(_e: any, value: any) => {
                console.log('changing mandatory');
                setFromObject({
                  ...fromObject,
                  modifiers: {
                    ...fromObject.modifiers,
                    mandatory: value.map((v: any) =>
                      typeof v === 'string' ? { label: v, value: v } : v,
                    ),
                  },
                });
              }}
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
            <ModifierInput
              value={fromObject.modifiers.optional}
              onChange={(e: any, value: any) => {
                setFromObject({
                  ...fromObject,
                  modifiers: {
                    ...fromObject.modifiers,
                    optional: value.map((v: any) =>
                      typeof v === 'string' ? { label: v, value: v } : v,
                    ),
                  },
                });
              }}
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
