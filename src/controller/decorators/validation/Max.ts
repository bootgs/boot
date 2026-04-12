import { addParamPipe } from "../../../repository";
import { MaxPipe } from "./pipes/MaxPipe";

/**
 * Parameter decorator for validating that a number or bigint is at most a specified maximum.
 *
 * @param   {number | bigint} value - The maximum allowed value.
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function Max(value: number | bigint): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new MaxPipe(value));
  };
}
