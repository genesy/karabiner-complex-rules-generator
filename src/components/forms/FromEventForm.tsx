import React from 'react';
import {
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
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
import { suffix, titleCase } from '../../helpers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const optionalBoolean: string[] = ['none', 'true', 'false'];
const keyOrder: string[] = ['none', 'insensitive', 'strict', 'strict_inverse'];
const keyUpWhen: string[] = ['none', 'any', 'all'];

interface Props {
  fromObject: IFromEventDefinition;
  setFromObject: (args0: IFromEventDefinition) => void;
}

const FromEventForm: React.FC<Props> = ({ fromObject, setFromObject }) => {
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
    newFromObject.simultaneous.push({
      _id: _.uniqueId('simultaneous_'),
    });
    setFromObject(newFromObject);
  };

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
            const index = _.findIndex(fromObject.simultaneous, {
              _id: newSimultaneousObject._id,
            });
            newFromObject.simultaneous = newFromObject.simultaneous || [];
            newFromObject.simultaneous[index] = newSimultaneousObject;
            setFromObject(newFromObject);
          };
          return (
            <ExpansionPanel key={index} defaultExpanded={index === 0}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                {index + 1}
                {suffix(index + 1)} Simultaneous Event
              </ExpansionPanelSummary>
              <Box p={1}>
                <KeyCodeAndPointingButtonInput
                  eventObject={simultaneous}
                  setEventObject={setSimultaneous}
                />
              </Box>
            </ExpansionPanel>
          );
        })}
        <Button
          variant="contained"
          color="primary"
          onClick={() => addSimultaneous()}
        >
          Add Simultaneous Event
        </Button>
      </Box>
      <Box>
        <ExpansionPanel>
          <ExpansionPanelSummary>Simultaneous Options</ExpansionPanelSummary>
          <Box p={1}>
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
          </Box>
        </ExpansionPanel>
      </Box>
    </Box>
  );
};

export default FromEventForm;
