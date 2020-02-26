import React, { useState, useEffect } from 'react';
import RuleForm from './forms/RuleForm';
import FormContext from '../context/FormContext';
import {
  Grid,
  Button,
  TextField,
  Box,
  ExpansionPanelSummary,
  ExpansionPanel,
  Typography,
  Container,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { suffix, titleCase } from '../helpers';
import _ from 'lodash';
import IRule from '../types/IRule';
import IManipulator from '../types/IManipulator';
import IFromEventDefinition from '../types/IFromEventDefinition';
import { initialFromObject } from '../initialStates';
import IToEventDefinition from '../types/IToEventDefinition';
import ISimultaneous from '../types/ISimultaneous';

interface Props {}
interface FormState {
  title: string;
  rules: any[];
}

const initialManipulator: IManipulator = {
  type: 'basic',
  from: {
    modifiers: {
      mandatory: [],
      optional: [],
    },
    simultaneous: [],
  },
};

const getInitialRule = (): IRule => {
  return {
    ...generateWithId({ description: '' }, 'rule'),
    manipulators: [generateWithId(initialManipulator, 'manipulator')],
  };
};

const generateWithId = (obj: any = {}, prefix: string = '') => {
  if (prefix.length) {
    prefix += '_';
  }
  return { ...obj, _id: _.uniqueId(prefix) };
};

// TODO: move to separate file
const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];

const parseJSONfirst = (text: string) => {
  let parsedJSON = JSON.parse(text);

  // make sure from values have modifiers object
  parsedJSON.rules = parsedJSON.rules.map((rule: IRule) => {
    const newRule: IRule = generateWithId(rule, 'rule');
    newRule.manipulators = newRule.manipulators.map(
      (manipulator: IManipulator) => {
        const newManipulator = generateWithId(manipulator, 'manipulator');
        toFields.forEach((toField: string) => {
          if (newManipulator[toField]) {
            if (_.isPlainObject(newManipulator[toField])) {
              newManipulator[toField] = [newManipulator[toField]];
            }
            // newManipulator[toField] = [...manipulator[toField]];
            newManipulator[toField] = newManipulator[toField].map(
              (toObject: IToEventDefinition) => {
                return generateWithId(toObject, toField);
              },
            );
          }
        });

        return newManipulator;
      },
    );
    return newRule;
  });

  return parsedJSON;
};
const parseKey = (key: any) => (typeof key === 'string' ? key : key.value);

const parseKeys = (modifiers: any[]) => {
  return modifiers.map(parseKey);
};

const parseFromObject = (fromObject: IFromEventDefinition) => {
  const _from: IFromEventDefinition = Object.assign(
    {},
    initialFromObject,
    fromObject,
  );

  if (typeof _from.key_code === 'object') {
    _from.key_code = parseKey(_from.key_code);
  }

  if (_from.modifiers) {
    if (_from.modifiers.mandatory) {
      if (_from.modifiers.mandatory?.length === 0) {
        delete _from.modifiers.mandatory;
      } else {
        if (typeof _from.modifiers.mandatory === 'string') {
          _from.modifiers.mandatory = [_from.modifiers.mandatory];
        }
        _from.modifiers.mandatory = parseKeys(_from.modifiers.mandatory);
      }
    }

    if (_from.modifiers.optional) {
      if (_from.modifiers.optional.length === 0) {
        delete _from.modifiers.optional;
      } else {
        if (typeof _from.modifiers.optional === 'string') {
          _from.modifiers.optional = [_from.modifiers.optional];
        }
        _from.modifiers.optional = parseKeys(_from.modifiers.optional);
      }
    }
  }

  if (!_from.pointing_button || _from.pointing_button === 'disabled') {
    delete _from.pointing_button;
  }

  if (_.isEmpty(_from.modifiers)) {
    delete _from.modifiers;
  }

  return _from;
};

const parseStateToMinimumJSON = (state: any) => {
  const parsedState = _.cloneDeep(state);

  parsedState.rules.forEach((rule: any, ruleIndex: number) => {
    if (!rule?.description?.length) {
      delete rule.description;
    }
    rule.manipulators.forEach((manipulator: IManipulator) => {
      manipulator.from = parseFromObject(manipulator.from);

      const newSimultaneous: ISimultaneous[] = [];
      manipulator?.from?.simultaneous?.forEach(
        (simultaneous: ISimultaneous) => {
          delete simultaneous._id;
          if (simultaneous?.key_code?.value) {
            simultaneous.key_code = simultaneous.key_code.value;
          }
          if (!_.isEmpty(simultaneous)) {
            newSimultaneous.push(simultaneous);
          }
        },
      );

      toFields.forEach(toField => {
        if (!manipulator[toField]) return;
        manipulator[toField] = manipulator[toField].map(
          (toObject: IToEventDefinition) => {
            delete toObject._id;
            if (toObject.key_code) {
              toObject.key_code = parseKey(toObject.key_code);
            }
            if (toObject.modifiers) {
              toObject.modifiers =
                typeof toObject.modifiers === 'string'
                  ? toObject.modifiers
                  : parseKeys(toObject.modifiers);
            }
            return toObject;
          },
        );
      });
      manipulator.from.simultaneous = newSimultaneous;

      if (_.isEmpty(manipulator.from.simultaneous)) {
        delete manipulator.from.simultaneous;
      }
      delete manipulator._id;
    });
    delete rule._id;
  });

  return parsedState;
};

const MainForm: React.FC<Props> = () => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    rules: [getInitialRule()],
  });

  const parsedState = parseStateToMinimumJSON(formState);

  const setRule = (newRule: IRule) => {
    const index = _.findIndex(formState.rules, { _id: newRule._id });
    const newFormState = _.cloneDeep(formState);
    newFormState.rules[index] = { ...newFormState.rules[index], ...newRule };
    setFormState({ ...newFormState });
  };

  const getRuleByIndex = (index: number): any => formState.rules[index];

  const addRule = () => {
    const newFormState = { ...formState };
    newFormState.rules = newFormState.rules || [];
    newFormState.rules.push(getInitialRule());
    setFormState({ ...newFormState });
  };

  const install = () => {
    const base64string = window.btoa(JSON.stringify(parsedState));
    let url = `karabiner://karabiner/assets/complex_modifications/import?url=data:application/json;charset=utf-8;base64,${base64string}`;
    window.location.href = url;
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        setFormState,
        getRuleByIndex,
      }}
    >
      <Container>
        <Grid container direction="row" justify="space-between">
          <Grid item xs>
            <Box p={1}>
              <TextField
                fullWidth
                onChange={e =>
                  setFormState({ ...formState, title: e.currentTarget.value })
                }
                value={formState.title}
                variant="filled"
                label="Title"
              />
              {formState.rules.map((rule, index) => (
                <ExpansionPanel defaultExpanded={index === 0} key={index}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    {index +
                      1 +
                      suffix(index + 1) +
                      ' Rule' +
                      (rule.description ? ': ' + rule.description : '')}
                  </ExpansionPanelSummary>
                  <Box p={1}>
                    <RuleForm key={index} rule={rule} setRule={setRule} />
                  </Box>
                </ExpansionPanel>
              ))}

              <Button
                onClick={addRule}
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Rule
              </Button>
            </Box>
          </Grid>
          <Grid container xs item direction="column">
            <Grid item xs>
              <textarea
                className="generated-code"
                // value={JSON.stringify(formState, null, 2)}
                readOnly
                value={JSON.stringify(parsedState, null, 2)}
              />
              <Button
                onClick={install}
                fullWidth
                color="primary"
                variant="contained"
              >
                Install!
              </Button>
            </Grid>
            {/* <Grid item xs>
              <textarea
                className="generated-code"
                value={JSON.stringify(formState, null, 2)}
                readOnly
                // value={JSON.stringify(parseStateToMinimumJSON(formState), null, 2)}
              />
            </Grid> */}
            <Grid container item xs>
              <textarea
                placeholder="Try pasting existing complex modifications here. The simpler the better, everything is still experimental."
                className="generated-code"
                onBlur={e => {
                  try {
                    if (e.target.value)
                      setFormState(parseJSONfirst(e.target.value));
                  } catch (e) {
                    console.log({ e });
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FormContext.Provider>
  );
};
export default MainForm;
