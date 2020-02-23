import { InputLabel } from '@material-ui/core';
import { loadavg } from 'os';

const MODIFIERS = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '9',
    value: '9',
  },
  {
    label: '0',
    value: '0',
  },
  {
    label: 'a',
    value: 'a',
  },
  {
    label: 'b',
    value: 'b',
  },
  {
    label: 'c',
    value: 'c',
  },
  {
    label: 'd',
    value: 'd',
  },
  {
    label: 'e',
    value: 'e',
  },
  {
    label: 'f',
    value: 'f',
  },
  {
    label: 'g',
    value: 'g',
  },
  {
    label: 'h',
    value: 'h',
  },
  {
    label: 'i',
    value: 'i',
  },
  {
    label: 'j',
    value: 'j',
  },
  {
    label: 'k',
    value: 'k',
  },
  {
    label: 'l',
    value: 'l',
  },
  {
    label: 'm',
    value: 'm',
  },
  {
    label: 'n',
    value: 'n',
  },
  {
    label: 'o',
    value: 'o',
  },
  {
    label: 'p',
    value: 'p',
  },
  {
    label: 'q',
    value: 'q',
  },
  {
    label: 'r',
    value: 'r',
  },
  {
    label: 's',
    value: 's',
  },
  {
    label: 't',
    value: 't',
  },
  {
    label: 'u',
    value: 'u',
  },
  {
    label: 'v',
    value: 'v',
  },
  {
    label: 'w',
    value: 'w',
  },
  {
    label: 'x',
    value: 'x',
  },
  {
    label: 'y',
    value: 'y',
  },
  {
    label: 'z',
    value: 'z',
  },
  {
    label: 'F1',
    value: 'f1',
  },
  {
    label: 'F2',
    value: 'f2',
  },
  {
    label: 'F3',
    value: 'f3',
  },
  {
    label: 'F4',
    value: 'f4',
  },
  {
    label: 'F5',
    value: 'f5',
  },
  {
    label: 'F6',
    value: 'f6',
  },
  {
    label: 'F7',
    value: 'f7',
  },
  {
    label: 'F8',
    value: 'f8',
  },
  {
    label: 'F9',
    value: 'f9',
  },
  {
    label: 'F10',
    value: 'f10',
  },
  {
    label: 'F11',
    value: 'f11',
  },
  {
    label: 'F12',
    value: 'f12',
  },
  {
    label: 'Escape',
    value: 'esc',
  },
  {
    label: '` grave accent, tilde',
    value: 'grave_accent_and_tilde',
  },
  {
    label: 'Tab key',
    value: 'tab',
  },
  {
    label: 'Caps Lock',
    value: 'caps_lock',
  },
  {
    label: 'Function key',
    value: 'fn',
  },
  {
    label: 'Left Command',
    value: 'left_gui',
  },
  {
    label: 'Right Command',
    value: 'right_gui',
  },
  {
    label: 'Left Control',
    value: 'left_control',
  },
  {
    label: 'Right Control',
    value: 'right_control',
  },
  {
    label: 'Left Alt',
    value: 'left_alt',
  },
  {
    label: 'Right Alt',
    value: 'right_alt',
  },
  {
    label: 'Left Shift',
    value: 'left_shift',
  },
  {
    label: 'Right Shift',
    value: 'right_shift',
  },
  {
    label: 'Spacebar',
    value: 'spacebar',
  },
  {
    label: 'Up Arrow',
    value: 'up_arrow',
  },
  {
    label: 'Left Arrow',
    value: 'left_arrow',
  },
  {
    label: 'Down Arrow',
    value: 'down_arrow',
  },
  {
    label: 'Right Arrow',
    value: 'right_arrow',
  },
  {
    label: 'Enter',
    value: 'return_or_enter',
  },
  {
    label: ' (Backslash)',
    value: 'backslash',
  },
  {
    label: '[ (Open Bracket)',
    value: 'open_bracket',
  },
  {
    label: '] (Close Bracket)',
    value: 'close_bracket',
  },
  {
    label: '; (Semicolon)',
    value: 'semicolon',
  },
  {
    label: "' (Quote)",
    value: 'quote',
  },
  {
    label: ', (Comma)',
    value: 'comma',
  },
  {
    label: '. (Period)',
    value: 'period',
  },
  {
    label: '/ (Slash)',
    value: 'slash',
  },
  {
    label: '- (Dash or Hyphen)',
    value: 'hyphen',
  },
  {
    label: '= (Equal)',
    value: 'equal_sign',
  },
  {
    label: 'Delete or Backspace',
    value: 'delete_or_backspace',
  },
  {
    label: 'Decrease Brightness',
    value: 'display_brightness_decrement',
  },
  {
    label: 'Increase Brightness',
    value: 'display_brightness_increment',
  },
  {
    label: 'Mission Control',
    value: 'mission_control',
  },
  {
    label: 'Launchpad',
    value: 'launchpad',
  },
  {
    label: 'Keyboard Brightness Decrease',
    value: 'illumination_decrement',
  },
  {
    label: 'Keyboard Brightness Increase',
    value: 'illumination_increment',
  },
  {
    label: 'Rewind / Previous',
    value: '',
  },
  {
    label: 'Play or Pause',
    value: 'play_or_pause',
  },
  {
    label: 'Fastfoward / Next',
    value: 'fastforwad',
  },
  {
    label: 'Mute',
    value: 'mute',
  },
  {
    label: 'Volume Down',
    value: 'volume_decrement',
  },
  {
    label: 'Volume Up',
    value: 'volume_increment',
  },
];

export { MODIFIERS };
