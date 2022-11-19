import React, { useMemo, useEffect } from 'react';
import RuleForm from './forms/RuleForm';
import {
  Grid,
  Button,
  TextField,
  Box,
  Container,
  ButtonGroup,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import _ from 'lodash';
import IRule from '../types/IRule';
import IManipulator from '../types/IManipulator';
import IFromEventDefinition from '../types/IFromEventDefinition';
import IToEventDefinition from '../types/IToEventDefinition';
import { useDispatch, useSelector } from 'react-redux';
import { addRule, setTitle, setWholeState } from '../ducks/formState';
import IFormState from '../types/IFormState';
import { ALL_KEYS } from '../constants';

interface Props {}
interface FormState {
  title: string;
  rules: any[];
}
// TODO: move to separate file
const toFields: string[] = [
  'to',
  'to_if_alone',
  'to_if_held_down',
  'to_after_key_up',
];

const parseJSONfirst = (text: any) => {
  let parsedJSON;
  if (typeof text === 'string') {
    parsedJSON = JSON.parse(text);
  } else if (typeof text === 'object') {
    parsedJSON = { ...text };
  }
  parsedJSON.rules = parsedJSON.rules.map((rule: any) => {
    rule.description = rule.description || '';
    rule.manipulators = rule.manipulators || [];
    rule.manipulators = rule.manipulators.map((manipulator: any) => {
      manipulator.type = manipulator.type || 'basic';
      manipulator.from = manipulator.from || {
        modifiers: {
          mandatory: [],
          optional: [],
        },
        simultaneous: [],
        simultaneous_options: {
          detect_key_down_uninterruptedly: false,
          to_after_key_up: [],
        },
      };
      if (typeof manipulator.from.key_code === 'string') {
        const kc = manipulator.from.key_code;
        manipulator.from.key_code = _.find(ALL_KEYS, { value: kc }) || {
          label: kc,
          value: kc,
        };
      }
      manipulator.conditions = manipulator.conditions || [];
      manipulator.to = manipulator.to || [];
      manipulator.to_after_key_up = manipulator.to_after_key_up || [];
      manipulator.to_if_alone = manipulator.to_if_alone || [];
      manipulator.to_if_held_down = manipulator.to_if_held_down || [];
      manipulator.to_delayed_action = manipulator.to_delayed_action || {
        to_if_invoked: [],
        to_if_canceled: [],
      };
      return manipulator;
    });
    return rule;
  });

  return parsedJSON;
};
const parseKey = (key: any) =>
  typeof key === 'string' ? key : key.value || '';

const parseKeys = (modifiers: any[]) => {
  return modifiers.map(parseKey);
};

const parseFromObject = (fromObject: IFromEventDefinition): any => {
  const _from = { ...fromObject };
  if (_.isEmpty(_from)) {
    return;
  }

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

  if (_from?.simultaneous_options?.to_after_key_up?.length === 0) {
    delete _from.simultaneous_options.to_after_key_up;
  }
  if (_from?.simultaneous?.length === 0) {
    delete _from.simultaneous;
  }
  if (_from?.simultaneous?.length) {
    _from.simultaneous = _from.simultaneous.map(sim => {
      if (sim.key_code) {
        sim.key_code = parseKey(sim.key_code);
      }
      return sim;
    });
  }

  if (
    _.isEqual(_from.simultaneous_options, {
      detect_key_down_uninterruptedly: false,
    })
  ) {
    delete _from.simultaneous_options;
  }
  if (!_from.pointing_button || _from.pointing_button === 'disabled') {
    delete _from.pointing_button;
  }
  if (_.isEmpty(_from.modifiers)) {
    delete _from.modifiers;
  }
  return _from;
};

const parseToObject = (toObject: IToEventDefinition): any => {
  const _to = { ...toObject };
  if (typeof _to.key_code === 'object') {
    _to.key_code = parseKey(toObject.key_code);
  }
  if (Array.isArray(_to.modifiers) && _to.modifiers.length) {
    _to.modifiers = parseKeys(_to.modifiers);
  }
  return _to;
};

const parseRuleObject = (rule: IRule): any => {
  const _rule = { ...rule };
  if (!rule?.description?.length) {
    delete rule.description;
  }
  rule.manipulators = rule.manipulators.map((manipulator: IManipulator) => {
    manipulator.from = parseFromObject(manipulator.from);
    toFields.forEach(toField => {
      if (!manipulator[toField]) return;
      if (manipulator[toField]?.length === 0) {
        delete manipulator[toField];
        return;
      }
      manipulator[toField] = manipulator[toField].map(
        (toObject: IToEventDefinition) => {
          return parseToObject(toObject);
        },
      );
    });

    if (manipulator?.to_delayed_action?.to_if_invoked?.length === 0) {
      delete manipulator.to_delayed_action.to_if_invoked;
    }
    if (manipulator?.to_delayed_action?.to_if_canceled?.length === 0) {
      delete manipulator.to_delayed_action.to_if_canceled;
    }
    if (_.isEmpty(manipulator?.to_delayed_action)) {
      delete manipulator.to_delayed_action;
    }

    if (manipulator?.conditions?.length === 0) {
      delete manipulator.conditions;
    }
    return manipulator;
  });
  return _rule;
};

const parseStateToMinimumJSON = (state: any) => {
  const parsedState = _.cloneDeep(state);
  parsedState.rules = parsedState.rules.map((rule: IRule) => {
    return parseRuleObject(rule);
  });
  return parsedState;
};

const MainForm: React.FC<Props> = () => {
  const formState = useSelector((state: IFormState) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const state = JSON.parse(
        window.atob(
          window.location.href.slice(window.location.href.indexOf('#') + 1),
        ),
      );
      dispatch(setWholeState(parseJSONfirst(state)));
    } catch (e) {}
  }, []);

  const parsedState = parseStateToMinimumJSON(formState);

  const install = () => {
    const base64string = window.btoa(JSON.stringify(parsedState));
    let url = `karabiner://karabiner/assets/complex_modifications/import?url=data:application/json;charset=utf-8;base64,${base64string}`;
    window.location.href = url;
  };
  const generateUrl = () => {
    const base64string = window.btoa(JSON.stringify(parsedState));
    window.history.replaceState(undefined, '', '#' + base64string);
    alert('copy the url in your addess bar to share');
  };

  const titleForm = useMemo(() => {
    return (
      <Box m={1}>
        <TextField
          fullWidth
          onChange={e => dispatch(setTitle(e.target.value))}
          value={formState.title}
          variant="outlined"
          label="Modification Title"
        />
      </Box>
    );
  }, [formState.title]);
  return (
    <Container className="app-container">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={8} className="form-wrapper">
          {titleForm}
          <Box p={1}>
            {formState.rules.map((rule, index) => (
              <RuleForm index={index} key={index} rule={rule} />
            ))}
            <Box mt={2}>
              <Button
                onClick={() => dispatch(addRule())}
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Rule
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid container xs={4} item direction="column">
          <Box p={2}>
            <Typography>Your Modification</Typography>
            <textarea
              className="generated-code"
              // value={JSON.stringify(formState, null, 2)}
              readOnly
              value={JSON.stringify(parsedState, null, 2)}
            />

            <Box mt={1} mb={1}>
              <ButtonGroup fullWidth>
                <Button onClick={install} color="primary" variant="contained">
                  Install!
                </Button>
                <Button
                  onClick={generateUrl}
                  color="primary"
                  variant="contained"
                >
                  Share!
                </Button>
              </ButtonGroup>
            </Box>
            <textarea
              placeholder="Paste existing modification here to edit"
              className="paste-code"
              onBlur={e => {
                try {
                  if (e.target.value)
                    dispatch(setWholeState(parseJSONfirst(e.target.value)));
                } catch (e) {
                  console.log({ e });
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default MainForm;
