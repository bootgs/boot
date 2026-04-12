import { addParamPipe } from "../../../repository";
import { AssertFalsePipe } from "./pipes/AssertFalsePipe";

/**
 * Parameter decorator for validating that a value is false.
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function AssertFalse(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new AssertFalsePipe());
  };
}
