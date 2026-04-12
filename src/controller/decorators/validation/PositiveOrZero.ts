import { addParamPipe } from "../../../repository";
import { PositiveOrZeroPipe } from "./pipes/PositiveOrZeroPipe";

/**
 * Parameter decorator for validating that a number or bigint is positive or zero (>= 0).
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function PositiveOrZero(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new PositiveOrZeroPipe());
  };
}
