import IRule from '../types/IRule';
import IManipulator from '../types/IManipulator';
import _ from 'lodash';
import IFormState from '../types/IFormState';
import produce from 'immer';
import IFromEventDefinition from '../types/IFromEventDefinition';
import IToEventDefinition from '../types/IToEventDefinition';

const initialManipulator: IManipulator = {
  type: 'basic',
  from: {
    modifiers: {
      mandatory: [],
      optional: [],
    },
    simultaneous: [],
    simultaneous_options: {
      detect_key_down_uninterruptedly: false,
      to_after_key_up: [],
    },
  },
  conditions: [],
  to: [],
  to_after_key_up: [],
  to_if_alone: [],
  to_if_held_down: [],
  to_delayed_action: {
    to_if_invoked: [],
    to_if_canceled: [],
  },
};

const getInitialRule = (): IRule => {
  return {
    description: '',
    _id: _.uniqueId('rule_'),
    manipulators: [
      {
        ...initialManipulator,
        _id: _.uniqueId('manipulator_'),
      },
    ],
  };
};
const initialFormState: IFormState = {
  title: '',
  rules: [getInitialRule()],
};

const SET_TITLE = 'SET_TITLE';
const ADD_RULE = 'ADD_RULE';
const REMOVE_RULE = 'REMOVE_RULE';
const SET_RULE = 'SET_RULE';
const ADD_MANIPULATOR = 'ADD_MANIPULATOR';
const SET_MANIPULATOR = 'SET_MANIPULATOR';
const SET_FROM_OBJECT = 'SET_FROM_OBJECT';
const ADD_TO_OBJECT = 'ADD_TO_OBJECT';
const SET_TO_OBJECT = 'SET_TO_OBJECT';

export const formStateReducer = (state = initialFormState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case REMOVE_RULE:
        draft.rules.splice(action.payload.index, 1);
        break;
      case SET_TITLE:
        draft.title = action.payload.title;
        break;

      case ADD_RULE:
        draft.rules.push(getInitialRule());
        break;
      case SET_RULE:
        if (action.payload) {
          const { rule, index } = action.payload;
          draft.rules[index] = rule;
        }
        break;
      case ADD_MANIPULATOR:
        if (action.payload) {
          const { ruleIndex } = action.payload;
          draft.rules[ruleIndex].manipulators.push({
            ...initialManipulator,
            _id: _.uniqueId('manipulator_'),
          });
        }
        break;
      case SET_MANIPULATOR:
        if (action.payload) {
          const { ruleIndex, index, manipulator } = action.payload;
          draft.rules[ruleIndex].manipulators[index] = manipulator;
        }
        break;
      case SET_FROM_OBJECT:
        if (action.payload) {
          const { ruleIndex, manipulatorIndex, fromObject } = action.payload;
          draft.rules[ruleIndex].manipulators[
            manipulatorIndex
          ].from = fromObject;
        }
        break;
      case ADD_TO_OBJECT:
        if (action.payload) {
          const { toField, ruleIndex, manipulatorIndex } = action.payload;
          const initToObj = {
            repeat: true,
            _id: _.uniqueId(toField + '_'),
          };
          const manip = draft.rules[ruleIndex].manipulators[manipulatorIndex];
          if (toField === 'to_if_canceled' || toField === 'to_if_invoked') {
            if (toField === 'to_if_canceled') {
              manip.to_delayed_action.to_if_canceled.push(initToObj);
            } else {
              manip.to_delayed_action.to_if_invoked.push(initToObj);
            }
          } else {
            manip[toField].push(initToObj);
          }
        }
        break;
      case SET_TO_OBJECT:
        if (action.payload) {
          const {
            toField,
            ruleIndex,
            manipulatorIndex,
            toIndex,
            toObject,
          } = action.payload;

          // TODO: wtf is this can i fix this someday pls
          draft.rules[ruleIndex].manipulators[manipulatorIndex][toField][
            toIndex
          ] = toObject;
        }
        break;
      default:
        break;
    }
  });
};

export const setTitle = (title: string) => {
  return {
    type: SET_TITLE,
    payload: {
      title,
    },
  };
};

export const addRule = () => {
  return {
    type: ADD_RULE,
  };
};

export const removeRule = (index?: number) => {
  return {
    type: REMOVE_RULE,
    payload: {
      index,
    },
  };
};

export const setRule = (index: number, rule: IRule) => {
  return {
    type: SET_RULE,
    payload: {
      index,
      rule,
    },
  };
};

export const addManipulator = (ruleIndex: number) => {
  return {
    type: ADD_MANIPULATOR,
    payload: {
      ruleIndex,
    },
  };
};

export const setManipulator = ({
  ruleIndex,
  index,
  manipulator,
}: {
  ruleIndex: number;
  index: number;
  manipulator: IManipulator;
}) => {
  return {
    type: SET_MANIPULATOR,
    payload: {
      ruleIndex,
      index,
      manipulator,
    },
  };
};

export const setFromObject = ({
  ruleIndex,
  manipulatorIndex,
  fromObject,
}: {
  ruleIndex: number;
  manipulatorIndex: number;
  fromObject: IFromEventDefinition;
}) => {
  return {
    type: SET_FROM_OBJECT,
    payload: {
      ruleIndex,
      manipulatorIndex,
      fromObject,
    },
  };
};

export const addToObject = ({
  ruleIndex,
  manipulatorIndex,
  toField,
}: {
  ruleIndex: number;
  manipulatorIndex: number;
  toField: string;
}) => {
  return {
    type: ADD_TO_OBJECT,
    payload: {
      ruleIndex,
      manipulatorIndex,
      toField,
    },
  };
};

export const setToObject = ({
  ruleIndex,
  manipulatorIndex,
  toField,
  toIndex,
  toObject,
}: {
  ruleIndex: number;
  manipulatorIndex: number;
  toField: string;
  toIndex: number;
  toObject: IToEventDefinition;
}) => {
  return {
    type: SET_TO_OBJECT,
    payload: {
      ruleIndex,
      manipulatorIndex,
      toField,
      toIndex,
      toObject,
    },
  };
};
