enum Modifier {
  CapsLock = "caps_lock",
  LeftCommand = "left_command",
  LeftGui = "left_gui",
  LeftControl = "left_control",
  LeftOption = "left_option",
  LeftAlt = "left_alt",
  LeftShift = "left_shift",
  RightCommand = "right_command",
  RightGui = "right_gui",
  RightControl = "right_control",
  RightOption = "right_option",
  RightAlt = "right_alt",
  RightShift = "right_shift",
  FunctionKey = "fn",
  AnyCommand = "command",
  AnyControl = "control",
  AnyOption = "option",
  AnyShift = "shift",
  Any = "any",
}

enum KeyCode {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Zero = "0",
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
  I = "i",
  J = "j",
  K = "k",
  L = "l",
  M = "m",
  N = "n",
  O = "o",
  P = "p",
  Q = "q",
  R = "r",
  S = "s",
  T = "t",
  U = "u",
  V = "v",
  W = "w",
  X = "x",
  Y = "y",
  Z = "z",
  F1 = "F1",
  F2 = "F2",
  F3 = "F3",
  F4 = "F4",
  F5 = "F5",
  F6 = "F6",
  F7 = "F7",
  F8 = "F8",
  F9 = "F9",
  F10 = "F10",
  F11 = "F11",
  F12 = "F12",
  F13 = "F13",
  F14 = "F14",
  F15 = "F15",
  F16 = "F16",
  F17 = "F17",
  F18 = "F18",
  F19 = "F19",
  Escape = "escape",
  Tilde = "grave_accent_and_tilde",
  Tab = "tab",
  CapsLock = "caps_lock",
  Spacebar = "spacebar",
  Up = "up_arrow",
  Left = "left_arrow",
  Down = "down_arrow",
  Right = "right_arrow",
  Enter = "return_or_enter",
  Backlash = "backlash",
  OpenBracket = "open_bracket",
  CloseBracket = "close_bracket",
  Semicolon = "semicolon",
  Quote = "quote",
  Comma = "comma",
  Period = "period",
  Slash = "slash",
  Hyphen = "hyphen",
  Equal = "equal_sign",
  DeleteOrBackspace = "delete_or_backspace",
  DisplayBrightnessDown = "display_brightness_decrement",
  DisplayBrightnessUp = "display_brightness_increment",
  MissionControl = "mission_control",
  Launchpad = "launchpad",
  KeyboardBrightnessDown = "illumination_decrement",
  KeyboardBrightnessUp = "illumination_increment",
  RewindOrPrevious = "rewind",
  PlayOrPause = "play_or_pause",
  ForwardOrNext = "fastfoward",
  Mute = "mute",
  VolumeDown = "volume_decrement",
  VolumeUp = "volume_increment",
}

type PointingButton =
  | "disabled"
  | "button1"
  | "button2"
  | "button3"
  | "button4"
  | "button5";

type AnyCode = "key_code" | "consumer_key_code" | "pointing_button";

export interface Simultaneous {
  key_code?: KeyCode;
  consumer_key_code?: string;
  pointing_button?: PointingButton;
  any?: AnyCode;
}

type KeyOrder = "insensitive" | "strict" | "strict_inverse";

export interface SimultaneousOptions {
  detect_key_down_uninterruptedly?: boolean;
  key_down_order?: KeyOrder;
  key_up_order?: KeyOrder;
  key_up_when?: "any" | "all";
  to_after_key_up?: ToEvent;
}

export interface MouseKey {
  x?: number;
  y?: number;
  vertical_wheel?: number;
  horizontal_wheel?: number;
  speed_multiplier?: number;
}

type StickyModifierOption = "on" | "off" | "toggle";
export interface StickyModifier {
  [Modifier.LeftControl]?: StickyModifierOption;
  [Modifier.LeftShift]?: StickyModifierOption;
  [Modifier.LeftOption]?: StickyModifierOption;
  [Modifier.LeftCommand]?: StickyModifierOption;
  [Modifier.RightControl]?: StickyModifierOption;
  [Modifier.RightShift]?: StickyModifierOption;
  [Modifier.RightOption]?: StickyModifierOption;
  [Modifier.RightCommand]?: StickyModifierOption;
  [Modifier.FunctionKey]?: StickyModifierOption;
}

export interface SetVariable {
  name: string;
  value: string;
}

export interface ToEvent {
  key_code?: KeyCode;
  consumer_key_code?: string;
  pointing_button?: PointingButton;
  shell_command?: string;
  select_input_source?: {
    language?: string;
    input_source_id?: string;
    input_mode_id?: string;
  };
  set_variable?: SetVariable;
  mouse_key?: MouseKey;
  sticky_modifier?: StickyModifier;
  lazy?: boolean;
  repeat?: boolean;
  halt?: boolean;
  hold_down_milliseconds?: number;
}

export interface FromEvent {
  key_code?: KeyCode;
  consumer_key_code?: string;
  pointing_button?: PointingButton;
  any?: AnyCode;
  modifiers?: {
    mandatory: Modifier[];
    optional?: Modifier[];
  };
  simultaneous?: Simultaneous;
  simultaneous_options?: SimultaneousOptions;
}

export interface ToIf {
  set_variable: SetVariable;
}

type ConditionType =
  | "frontmost_application_if"
  | "frontmost_application_unless"
  | "device_if"
  | "device_unless"
  | "keyboard_type_if"
  | "keyboard_type_unless"
  | "input_source_if"
  | "input_source_unless"
  | "variable_if"
  | "variable_unless"
  | "event_changed_if"
  | "event_changed_unless";

type KeyboardType = "ansi" | "iso" | "jis";

interface Identifier {
  vendor_id?: number;
  product_id?: number;
  description?: string;
  is_keyboard?: boolean;
  is_pointing_device?: boolean;
  is_touch_bar?: boolean;
}

interface InputSource {
  language?: string;
  input_source_id?: string;
  input_mode_id?: string;
}

// TODO: make different interfaces for different conditions;
export interface Condition {
  type: ConditionType;
  bundle_identifiers?: string[];
  file_paths?: string[];
  identifiers?: Identifier[];
  keyboard_types?: KeyboardType[];
  input_sources?: InputSource[];
  name?: string;
  value?: number | string | boolean;
}

interface Parameter {
  [key: string]: number | boolean | string;
}

export interface Manipulator {
  type: "basic";
  from: FromEvent;
  to?: ToEvent[];
  to_if_alone?: ToEvent[];
  to_if_held_down?: ToEvent[];
  to_after_key_up?: ToEvent[];
  to_delayed_action?: {
    to_if_invoked?: ToIf[];
    to_if_canceled?: ToIf[];
  };
  conditions?: Condition[];
  parameters?: Parameter;
  description?: string;
}
