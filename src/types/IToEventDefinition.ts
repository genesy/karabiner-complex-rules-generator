import IMouseKEy from './IMouseKey';

export default interface IToEventDefinition {
  key_code?: string;
  consumer_key_code?: string;
  pointing_button?: string;
  shell_command?: string;
  select_input_source?: string; // TODO: figure this out
  set_variable?: string;
  mouse_key?: IMouseKEy;
  modifiers?: string[];
  lazy?: Boolean;
  repeat?: Boolean;
  halt?: Boolean;
  hold_down_milliseconds?: Number;
  _id?: string;
}
