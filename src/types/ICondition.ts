interface IIdentifier {
  vendor_id?: number;
  product_id?: number;
  description?: string;
}
export default interface ICondition {
  type: string;
  bundle_identifiers?: string[];
  file_paths?: string[];
  identifiers?: IIdentifier[];
  keyboard_types: string[];
  input_sources: string[];
  name?: string;
  value?: string;
  description?: string;
}
