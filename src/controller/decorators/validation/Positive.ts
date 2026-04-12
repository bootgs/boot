import { addParamPipe } from "../../../repository";
import { PositivePipe } from "./pipes/PositivePipe";

/**
 * Parameter decorator for validating that a number or bigint is positive (> 0).
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function Positive(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new PositivePipe());
  };
}
