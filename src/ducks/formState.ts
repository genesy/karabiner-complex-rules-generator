import IRule from '../types/IRule';
import IManipulator from '../types/IManipulator';
import _ from 'lodash';
import IFormState from '../types/IFormState';
import produce from 'immer';
import IFromEventDefinition from '../types/IFromEventDefinition';

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
    },
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
          console.log('ah');
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
