import { addParamPipe } from "../../../repository";
import { AssertTruePipe } from "./pipes/AssertTruePipe";

/**
 * Parameter decorator for validating that a value is true.
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function AssertTrue(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new AssertTruePipe());
  };
}
