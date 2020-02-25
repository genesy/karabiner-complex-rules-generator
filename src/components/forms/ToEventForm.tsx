import React, { useState, useContext, useEffect } from 'react';
import KeyCodeAndPointingButtonInput from '../shared/KeyCodeAndPointingButtonInput';
import FormContext from '../../context/FormContext';
import IToEventDefinition from '../../types/IToEventDefinition';
import Modifier from '../../types/Modifier';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from '@material-ui/core';
import KeyInput from '../shared/KeyInput';
import DeleteIcon from '@material-ui/icons/Delete';
import IManipulator from '../../types/IManipulator';

interface Props {
  toObject: IToEventDefinition;
  setToObject: (arg0: IToEventDefinition) => void;
  removeToObject: () => void;
}

const ToEventForm: React.FC<Props> = ({
  toObject,
  setToObject,
  removeToObject,
}) => {
  const [showOptional, setShowOptional] = useState({
    keyCode: false,
    consumerKeyCode: false,
    pointingButton: false,
    simultaneous: false,
    simultaneousOptions: false,
  });

  useEffect(() => {
    const newToObject: any = { ...toObject };
    if (newToObject.pointing_button === 'disabled') {
      delete newToObject.pointing_button;
    }
    if (!showOptional.keyCode && !!newToObject.key_code) {
      delete newToObject.key_code;
    } else {
      newToObject.key_code = newToObject.key_code?.value;
    }
    if (!showOptional.consumerKeyCode && !!newToObject.consumer_key_code) {
      delete newToObject.consumer_key_code;
    }
    if (!newToObject.modifiers?.length) {
      delete newToObject.modifiers;
    } else {
      newToObject.modifiers = newToObject.modifiers.map(
        (m: Modifier) => m.value,
      );
    }
    if (newToObject.lazy === false) {
      delete newToObject.lazy;
    }
    if (newToObject.repeat === true) {
      delete newToObject.repeat;
    }
    if (newToObject.halt === false) {
      delete newToObject.halt;
    }
    // const toArray = [...ruleState[type]];
    // toArray[index] = { ...newToObject };

    // setRuleState({
    //   ...ruleState,
    //   [type]: toArray,
    // });
  }, [toObject, showOptional]);
  return (
    <Box className="form-container">
      <KeyCodeAndPointingButtonInput
        setEventObject={setToObject}
        eventObject={toObject}
      />
      <KeyInput
        freeSolo={false}
        modifiers
        value={toObject.modifiers}
        label="Modifiers"
        onChange={(_e: any, value: any) => {
          console.log({ value });
          setToObject({
            ...toObject,
            modifiers: value.map((v: any) =>
              typeof v === 'string' ? { label: v, value: v } : v,
            ),
          });
        }}
      />
      <FormControl fullWidth>
        <FormLabel>Additional Options</FormLabel>
        <FormControlLabel
          label="Lazy"
          control={
            <Checkbox
              checked={!!toObject.lazy}
              onChange={e => {
                setToObject({ ...toObject, lazy: e.target.checked });
              }}
            />
          }
        />
        <FormControlLabel
          label="Repeat"
          control={
            <Checkbox
              checked={!!toObject.repeat}
              onChange={e => {
                setToObject({ ...toObject, repeat: e.target.checked });
              }}
            />
          }
        />
        <FormControlLabel
          label="Halt"
          control={
            <Checkbox
              checked={!!toObject.halt}
              onChange={e => {
                setToObject({ ...toObject, halt: e.target.checked });
              }}
            />
          }
        />
      </FormControl>

      <Button
        color="secondary"
        variant="contained"
        onClick={() => removeToObject()}
        startIcon={<DeleteIcon />}
      >
        Remove
      </Button>
    </Box>
  );
};

export default ToEventForm;
