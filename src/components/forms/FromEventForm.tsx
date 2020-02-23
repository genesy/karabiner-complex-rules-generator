import React, { useState, useContext, useEffect } from 'react';
import { Box } from '@material-ui/core';

import FormContext from '../../context/FormContext';
import IFromEventDefinition from '../../types/IFromEventDefinition';
import Modifier from '../../types/Modifier';
import KeyInput from '../shared/KeyInput';
import KeyCodeAndPointingButtonInput from '../shared/KeyCodeAndPointingButtonInput';

const optionalBoolean: string[] = ['unset', 'true', 'false'];
const keyOrder: string[] = ['unset', 'insensitive', 'strict', 'strict_inverse'];
const keyUpWhen: string[] = ['unset', 'any', 'all'];

interface Props {
  ruleIndex: number;
}

const FromEventForm: React.FC<Props> = ({ ruleIndex }) => {
  const { getRuleByIndex, setRuleState } = useContext(FormContext);
  const ruleState = getRuleByIndex(ruleIndex);

  const [fromObject, setFromObject] = useState<IFromEventDefinition>({
    pointing_button: 'disabled',
    modifiers: {
      mandatory: [],
      optional: [],
    },
  });

  const [showOptional, setShowOptional] = useState({
    keyCode: false,
    consumerKeyCode: false,
    pointingButton: false,
    simultaneous: false,
    simultaneousOptions: false,
  });

  useEffect(() => {
    const newFromObject: any = {
      ...fromObject,
      modifiers: { ...fromObject.modifiers },
    };
    if (newFromObject.pointing_button === 'disabled') {
      delete newFromObject.pointing_button;
    }
    if (!showOptional.keyCode && !!newFromObject.key_code) {
      delete newFromObject.key_code;
    } else {
      newFromObject.key_code = newFromObject.key_code?.value;
    }
    if (!showOptional.consumerKeyCode && !!newFromObject.consumer_key_code) {
      delete newFromObject.consumer_key_code;
    }
    if (!newFromObject.modifiers?.mandatory.length) {
      delete newFromObject.modifiers.mandatory;
    } else {
      newFromObject.modifiers.mandatory = newFromObject.modifiers.mandatory.map(
        (m: Modifier) => m.value,
      );
    }

    if (!newFromObject.modifiers?.optional.length) {
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

    setRuleState(ruleIndex, { ...ruleState, from: newFromObject });
  }, [fromObject, showOptional]);

  return (
    <Box className="form-container">
      <KeyCodeAndPointingButtonInput
        setShowOptional={setShowOptional}
        showOptional={showOptional}
        setEventObject={setFromObject}
        eventObject={fromObject}
      />
      <div>
        <div>
          <KeyInput
            modifiers
            value={fromObject.modifiers.mandatory}
            label="Mandatory Modifiers (optional)"
            onChange={(_e: any, value: any) => {
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
        </div>
        <div>
          <KeyInput
            modifiers
            value={fromObject.modifiers.optional}
            label="Optional Modifiers (optional)"
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
        </div>
      </div>
      {/* <div>Simultaneous options coming soon</div> */}
      {/* <div>
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
          {showOptional.simultaneous ? 'Remove' : 'Add'} Simultaneous
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
      </div> */}
    </Box>
  );
};

export default FromEventForm;
