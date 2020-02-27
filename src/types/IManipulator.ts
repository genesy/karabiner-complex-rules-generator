import IFromEventDefinition from './IFromEventDefinition';
import IToEventDefinition from './IToEventDefinition';
import ICondition from './ICondition';

interface IToDelayedAction {
  to_if_invoked: IToEventDefinition[];
  to_if_canceled: IToEventDefinition[];
}
export default interface IManipulator {
  [key: string]: any;
  type: string;
  from: IFromEventDefinition;
  description?: string;
  to: IToEventDefinition[];
  to_if_alone: IToEventDefinition[];
  to_if_held_down: IToEventDefinition[];
  to_after_key_up: IToEventDefinition[];
  to_delayed_action: IToDelayedAction | any;
  conditions: ICondition[];
  parameters?: any;
  _id?: string;
}
