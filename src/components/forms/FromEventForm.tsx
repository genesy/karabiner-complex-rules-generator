import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
  ExpansionPanel,
  ExpansionPanelSummary,
} from '@material-ui/core';

import FormContext from '../../context/FormContext';
import IFromEventDefinition from '../../types/IFromEventDefinition';
import Modifier from '../../types/Modifier';
import KeyInput from '../shared/KeyInput';
import KeyCodeAndPointingButtonInput from '../shared/KeyCodeAndPointingButtonInput';
import { initialFromObject } from '../../initialStates';
import _ from 'lodash';

const optionalBoolean: string[] = ['unset', 'true', 'false'];
const keyOrder: string[] = ['unset', 'insensitive', 'strict', 'strict_inverse'];
const keyUpWhen: string[] = ['unset', 'any', 'all'];

interface Props {
  fromObject: IFromEventDefinition;
}

const FromEventForm: React.FC<Props> = ({ fromObject }) => {
  const { setRuleState } = useContext(FormContext);
  const [fromState, setFromState] = useState<IFromEventDefinition>({
    ...initialFromObject,
    ...fromObject,
  });

  const handleModifierChange = (event: any, value: any, type: string) => {
    setFromState({
      ...fromState,
      modifiers: {
        ...fromState.modifiers,
        [type]: value.map((v: any) =>
          typeof v === 'string' ? { label: v, value: v } : v,
        ),
      },
    });
  };

  const addSimultaneous = () => {
    const newFromState = { ...fromState };
    newFromState.simultaneous = newFromState.simultaneous || [];
    newFromState.simultaneous.push({});
    setFromState(newFromState);
  };

  useEffect(() => {
    setFromState(fromObject);
  }, [fromObject]);

  return (
    <Box className="form-container" p={1}>
      <KeyCodeAndPointingButtonInput
        setEventObject={() => {}}
        eventObject={fromState}
      />
      <div>
        <div>
          <KeyInput
            modifiers
            value={fromState.modifiers?.mandatory || []}
            label="Mandatory Modifiers (optional)"
            onChange={(event: any, value: any) =>
              handleModifierChange(event, value, 'mandatory')
            }
          />
        </div>
        <div>
          <KeyInput
            modifiers
            value={fromState.modifiers?.optional || []}
            label="Optional Modifiers (optional)"
            onChange={(event: any, value: any) =>
              handleModifierChange(event, value, 'optional')
            }
          />
        </div>
      </div>
      <Box>
        {fromState.simultaneous?.map((simultaneous: any, index: number) => {
          const setSimultaneous = (newSimultaneousObject: any) => {
            const newFromState = { ...fromState };
            // newFromState.simultaneous[index] = newSimultaneousObject;
            setFromState(newFromState);
          };
          return (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary>lol</ExpansionPanelSummary>
              <KeyCodeAndPointingButtonInput
                eventObject={simultaneous}
                setEventObject={() => {}}
              />
            </ExpansionPanel>
          );
        })}
        <Button onClick={() => addSimultaneous()}>Add Simultaneous</Button>
      </Box>
    </Box>
  );
};

export default FromEventForm;
