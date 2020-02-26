import React, { useMemo } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import IFromEventDefinition from '../../types/IFromEventDefinition';
import KeyInput from '../shared/KeyInput';
import KeyCodeAndPointingButtonInput from '../shared/KeyCodeAndPointingButtonInput';
import _ from 'lodash';
import { titleCase, withSuffix } from '../../helpers';
import AppExpansionPanel from '../shared/AppExpansionPanel';
import { useDispatch } from 'react-redux';
import { setFromObject } from '../../ducks/formState';

const optionalBoolean: string[] = ['none', 'true', 'false'];
const keyOrder: string[] = ['none', 'insensitive', 'strict', 'strict_inverse'];
const keyUpWhen: string[] = ['none', 'any', 'all'];

interface Props {
  fromObject: IFromEventDefinition;
  ruleIndex: number;
  manipulatorIndex: number;
}

const FromEventForm: React.FC<Props> = ({
  fromObject,
  ruleIndex,
  manipulatorIndex,
}) => {
  const dispatch = useDispatch();
  const _setFromObject = (fromObject: IFromEventDefinition) => {
    dispatch(setFromObject({ ruleIndex, manipulatorIndex, fromObject }));
  };
  const handleModifierChange = (event: any, value: any, type: string) => {
    _setFromObject({
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
    newFromObject.simultaneous = [
      ...newFromObject.simultaneous,
      { _id: _.uniqueId('simultaneous_') },
    ];
    _setFromObject(newFromObject);
  };

  return useMemo(
    () => (
      <Box className="form-container">
        <KeyCodeAndPointingButtonInput
          setEventObject={_setFromObject}
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
              if (newFromObject?.simultaneous?.length) {
                const x = [...newFromObject.simultaneous];
                x[index] = simultaneous;
                newFromObject.simultaneous = x;
                _setFromObject(newFromObject);
              }
            };
            return (
              <AppExpansionPanel
                key={index}
                panelProps={{ defaultExpanded: index === 0 }}
                title={`${withSuffix(index + 1)} Simultaneous Event`}
              >
                <KeyCodeAndPointingButtonInput
                  eventObject={simultaneous}
                  setEventObject={setSimultaneous}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    const newFromObject = { ...fromObject };
                    if (newFromObject?.simultaneous?.length) {
                      const simultaneous = [...newFromObject.simultaneous];
                      simultaneous.splice(index, 1);
                      newFromObject.simultaneous = simultaneous;
                      _setFromObject(newFromObject);
                    }
                  }}
                >
                  Remove Simultaneous
                </Button>
              </AppExpansionPanel>
            );
          })}
          <Box mt={1} mb={1}>
            <Button
              variant="contained"
              color="default"
              fullWidth
              onClick={() => addSimultaneous()}
            >
              Add Simultaneous Event
            </Button>
          </Box>
        </Box>
        {!!fromObject?.simultaneous?.length && (
          <Box>
            <AppExpansionPanel title="Simultaneous Options">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      !!fromObject?.simultaneous_options
                        ?.detect_key_down_uninterruptedly
                    }
                    onChange={() => {}}
                  />
                }
                label="Detect Key Down Uninterruptedly"
              />
              <FormControl fullWidth variant="filled">
                <InputLabel id="key_down_order">Key Down Order</InputLabel>
                <Select labelId="key_down_order" value={keyOrder[0]}>
                  {keyOrder.map(item => (
                    <MenuItem value={item} key={item}>
                      {titleCase(item)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="filled">
                <InputLabel id="key_up_order">Key Up Order</InputLabel>
                <Select labelId="key_up_order" value={keyOrder[0]}>
                  {keyOrder.map(item => (
                    <MenuItem value={item} key={item}>
                      {titleCase(item)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="filled">
                <InputLabel id="key_up_when">Key Up When</InputLabel>
                <Select labelId="key_up_when" value={keyUpWhen[0]}>
                  {keyUpWhen.map(item => (
                    <MenuItem value={item} key={item}>
                      {titleCase(item)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button color="primary" variant="contained">
                Add to_after_key_up event
              </Button>
            </AppExpansionPanel>
          </Box>
        )}
      </Box>
    ),
    [fromObject],
  );
};

export default FromEventForm;
