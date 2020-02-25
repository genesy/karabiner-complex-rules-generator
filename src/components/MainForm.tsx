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
const initialRule: IRule = {
  description: 'Rule 1 description',
  manipulators: [],
};

const getInitialRule = (): IRule => {
  return {
    ...generateWithId(initialRule, 'rule'),
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
            newManipulator[toField] = [...manipulator[toField]];
            newManipulator[toField] = newManipulator[toField].map(
              (toObject: IToEventDefinition) => {
                return generateWithId(toObject, toField);
              },
            );
            console.log(newManipulator[toField]);
          }
        });

        return newManipulator;
      },
    );
    return newRule;
  });

  return parsedJSON;
};
const parseKey = (key: any) => key.value;

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
      if (_from.modifiers.mandatory.length === 0) {
        delete _from.modifiers.mandatory;
      } else {
        _from.modifiers.mandatory = parseKeys(_from.modifiers.mandatory);
      }
    }

    if (_from.modifiers.optional) {
      if (_from.modifiers.optional.length === 0) {
        delete _from.modifiers.optional;
      } else {
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

const parseToObject = (toObject: any) => {};

const parseStateToMinimumJSON = (state: any) => {
  const parsedState = _.cloneDeep(state);

  parsedState.rules.forEach((rule: any, ruleIndex: number) => {
    if (!rule.description.length) {
      delete rule.description;
    }
    rule.manipulators.forEach((manipulator: IManipulator) => {
      manipulator.from = parseFromObject(manipulator.from);

      if (_.isEmpty(manipulator.from)) {
        delete manipulator.from;
      }
    });
  });

  return parsedState;
};

const MainForm: React.FC<Props> = () => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    rules: [getInitialRule()],
  });

  const setRule = (newRule: IRule) => {
    const index = _.findIndex(formState.rules, { _id: newRule._id });
    const newFormState = _.cloneDeep(formState);
    newFormState.rules[index] = { ...newFormState.rules[index], ...newRule };
    setFormState({ ...newFormState });
  };

  const [parsedState, setParsedState] = useState({});

  useEffect(() => {
    const newParsedState = parseStateToMinimumJSON(formState);
    setParsedState(newParsedState);
  }, [formState]);

  const getRuleByIndex = (index: number): any => formState.rules[index];

  const addRule = () => {
    setFormState({
      ...formState,
    });
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        setFormState,
        getRuleByIndex,
      }}
    >
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
        <Grid item xs container>
          <textarea
            className="generated-code"
            // value={JSON.stringify(formState, null, 2)}
            readOnly
            value={JSON.stringify(parsedState, null, 2)}
          />
          <textarea
            onBlur={e => {
              try {
                setFormState(parseJSONfirst(e.target.value));
              } catch (e) {
                console.log({ e });
              }
            }}
          />
        </Grid>
      </Grid>
    </FormContext.Provider>
  );
};
export default MainForm;
