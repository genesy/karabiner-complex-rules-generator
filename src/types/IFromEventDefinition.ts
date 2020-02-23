import ISimultaneous from './ISimultaneous';
import KeyOrder from './KeyOrder';
import KeyUpWhen from './KeyUpWhen';
import PointingButton from './PointingButton';
import IToEventDefinition from './IToEventDefinition';
import Modifier from './Modifier';

export default interface IFromEventDefinition {
  key_code?: string;
  consumer_key_code?: string;
  pointing_button?: PointingButton;
  modifiers: {
    mandatory: Modifier[];
    optional: Modifier[];
  };
  simultaneous?: ISimultaneous[];
  simultaneous_options?: {
    detect_key_down_uninterruptedly?: Boolean;
    key_down_order?: KeyOrder;
    key_up_order?: KeyOrder;
    key_up_when?: KeyUpWhen;
    to_after_key_up?: IToEventDefinition;
  };
}
