import IFromEventDefinition from './IFromEventDefinition';
import IToEventDefinition from './IToEventDefinition';
import IManipulator from './IManipulator';

export default interface IRule {
  description: string;
  manipulators: IManipulator[];
}
