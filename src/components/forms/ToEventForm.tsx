import React, { useState, useContext, useEffect } from 'react';
import KeyCodeAndPointingButtonInput from '../shared/KeyCodeAndPointingButtonInput';
import FormContext from '../../context/FormContext';
import IToEventDefinition from '../../types/IToEventDefinition';
import Modifier from '../../types/Modifier';
import {
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import KeyInput from '../shared/KeyInput';

interface Props {
  type: string;
  index: number;
  ruleIndex: number;
}

const ToEventForm: React.FC<Props> = ({ type, index, ruleIndex }) => {
  const { getRuleByIndex, setRuleState } = useContext(FormContext);
  const ruleState = getRuleByIndex(ruleIndex);
  const [toObject, setToObject] = useState<IToEventDefinition>({
    pointing_button: 'button1',
    modifiers: [],
  });

  const removeForm = () => {
    const toArray = [...ruleState[type]];
    toArray.splice(index, 1);
    setRuleState(ruleIndex, { ...ruleState, [type]: toArray });
  };

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
    const newToObject: any = { ...toObject };
    if (!showOptional.pointingButton) {
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
    const toArray = [...ruleState[type]];
    toArray[index] = { ...newToObject };

    setRuleState(ruleIndex, {
      ...ruleState,
      [type]: toArray,
    });
  }, [toObject, showOptional]);
  return (
    <div className="form-container">
      <Button color="secondary" onClick={() => removeForm()}>
        Remove
      </Button>
      <Typography variant="h6">
        {type.toUpperCase()}[{index}] EVENT DEFINITION
      </Typography>
      <KeyCodeAndPointingButtonInput
        showOptional={showOptional}
        setShowOptional={setShowOptional}
        setEventObject={setToObject}
        eventObject={toObject}
      />
      <Typography variant="h6">Modifiers</Typography>
      <KeyInput
        freeSolo={false}
        modifiers
        value={toObject.modifiers}
        onChange={(e: any, value: any) => {
          console.log({ value });
          setToObject({
            ...toObject,
            modifiers: value.map((v: any) =>
              typeof v === 'string' ? { label: v, value: v } : v,
            ),
          });
        }}
      />
      <FormControl>
        <FormLabel>Options</FormLabel>
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
      </FormControl>
    </div>
  );
};

export default ToEventForm;
