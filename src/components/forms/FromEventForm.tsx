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
import ISimultaneous from '../../types/ISimultaneous';
import ToEventForm from './ToEventForm';
import IToEventDefinition from '../../types/IToEventDefinition';

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
    newFromObject.simultaneous = [...newFromObject.simultaneous, {}];
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
              keyCodes
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
                const newSim = [...newFromObject.simultaneous];
                newSim[index] = newSimultaneousObject;
                newFromObject.simultaneous = newSim;
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
        <Box>
          <AppExpansionPanel title="Simultaneous Options">
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    !!fromObject?.simultaneous_options
                      ?.detect_key_down_uninterruptedly
                  }
                  onChange={e => {
                    _setFromObject({
                      ...fromObject,
                      simultaneous_options: {
                        ...fromObject.simultaneous_options,
                        detect_key_down_uninterruptedly: e.target.checked,
                      },
                    });
                  }}
                />
              }
              label="Detect Key Down Uninterruptedly"
            />
            <FormControl fullWidth variant="filled">
              <InputLabel id="key_down_order">Key Down Order</InputLabel>
              <Select
                labelId="key_down_order"
                value={fromObject.simultaneous_options?.key_down_order}
                onChange={e => {
                  _setFromObject({
                    ...fromObject,
                    simultaneous_options: {
                      ...fromObject.simultaneous_options,
                      key_down_order: e.target.value,
                    },
                  });
                }}
              >
                {keyOrder.map(item => (
                  <MenuItem value={item} key={item}>
                    {titleCase(item)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="filled">
              <InputLabel id="key_up_order">Key Up Order</InputLabel>
              <Select
                labelId="key_up_order"
                value={fromObject.simultaneous_options?.key_up_order}
                onChange={e => {
                  _setFromObject({
                    ...fromObject,
                    simultaneous_options: {
                      ...fromObject.simultaneous_options,
                      key_up_order: e.target.value,
                    },
                  });
                }}
              >
                {keyOrder.map(item => (
                  <MenuItem value={item} key={item}>
                    {titleCase(item)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="filled">
              <InputLabel id="key_up_when">Key Up When</InputLabel>
              <Select
                labelId="key_up_when"
                value={fromObject.simultaneous_options?.key_up_when}
                onChange={e => {
                  _setFromObject({
                    ...fromObject,
                    simultaneous_options: {
                      ...fromObject.simultaneous_options,
                      key_up_when: e.target.value,
                    },
                  });
                }}
              >
                {keyUpWhen.map(item => (
                  <MenuItem value={item} key={item}>
                    {titleCase(item)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box mt={1}>
              {fromObject.simultaneous_options?.to_after_key_up?.map(
                (toEvent: IToEventDefinition, index: number) => {
                  return (
                    <ToEventForm
                      toObject={toEvent}
                      setToObject={(toObject: IToEventDefinition) => {
                        const newFromObject = { ...fromObject };
                        const currentToField = [
                          ...newFromObject.simultaneous_options.to_after_key_up,
                        ];
                        currentToField[index] = toObject;
                        newFromObject.simultaneous_options = {
                          to_after_key_up: currentToField,
                        };
                        _setFromObject(newFromObject);
                      }}
                      removeToObject={() => {}}
                      index={index}
                      toField="to_after_key_up"
                      key={index}
                    />
                  );
                },
              )}
              <Button
                color="default"
                variant="contained"
                fullWidth
                onClick={() => {
                  const newFromObject: IFromEventDefinition = { ...fromObject };
                  const simOpts: any = {
                    ...newFromObject.simultaneous_options,
                  };
                  const toAfterKeyUp = simOpts.to_after_key_up
                    ? [...simOpts.to_after_key_up]
                    : [];
                  toAfterKeyUp.push({});
                  simOpts.to_after_key_up = toAfterKeyUp;
                  newFromObject.simultaneous_options = simOpts;
                  _setFromObject(newFromObject);
                }}
              >
                Add to_after_key_up event
              </Button>
            </Box>
          </AppExpansionPanel>
        </Box>
      </Box>
    ),
    [fromObject],
  );
};

export default FromEventForm;
