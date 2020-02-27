interface IIdentifier {
  [key: string]: any;
  vendor_id?: number;
  product_id?: number;
  description?: string;
  is_keyboard?: boolean;
  is_pointing_device?: boolean;
}
export default interface ICondition {
  type: string;
  bundle_identifiers?: string[];
  file_paths?: string[];
  identifiers?: IIdentifier[];
  keyboard_types?: string[];
  input_sources?: string[];
  name?: string;
  value?: string;
  description?: string;
}
