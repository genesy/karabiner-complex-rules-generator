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
  setFromObject: (args0: IFromEventDefinition) => void;
}

const FromEventForm: React.FC<Props> = ({ fromObject, setFromObject }) => {
  // const [fromObject, setFromObject] = useState<IFromEventDefinition>({
  //   ...initialFromObject,
  //   ...fromObject,
  // });

  const handleModifierChange = (event: any, value: any, type: string) => {
    setFromObject({
      ...fromObject,
      modifiers: {
        ...fromObject.modifiers,
        [type]: value.map((v: any) =>
          typeof v === 'string' ? { label: v, value: v } : v,
        ),
      },
    });
  };

  const addSimultaneous = () => {
    const newFromObject = { ...fromObject };
    newFromObject.simultaneous = newFromObject.simultaneous || [];
    newFromObject.simultaneous.push({});
    setFromObject(newFromObject);
  };

  useEffect(() => {
    setFromObject(fromObject);
  }, [fromObject]);

  return (
    <Box className="form-container" p={1}>
      <KeyCodeAndPointingButtonInput
        setEventObject={setFromObject}
        eventObject={fromObject}
      />
      <div>
        <div>
          <KeyInput
            modifiers
            value={fromObject.modifiers?.mandatory || []}
            label="Mandatory Modifiers (optional)"
            onChange={(event: any, value: any) =>
              handleModifierChange(event, value, 'mandatory')
            }
          />
        </div>
        <div>
          <KeyInput
            modifiers
            value={fromObject.modifiers?.optional || []}
            label="Optional Modifiers (optional)"
            onChange={(event: any, value: any) =>
              handleModifierChange(event, value, 'optional')
            }
          />
        </div>
      </div>
      <Box>
        {fromObject.simultaneous?.map((simultaneous: any, index: number) => {
          const setSimultaneous = (newSimultaneousObject: any) => {
            const newFromObject = { ...fromObject };
            // newFromObject.simultaneous[index] = newSimultaneousObject;
            setFromObject(newFromObject);
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
