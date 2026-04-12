import { addParamPipe } from "../../../repository";
import { MinPipe } from "./pipes/MinPipe";

/**
 * Parameter decorator for validating that a number or bigint is at least a specified minimum.
 *
 * @param   {number | bigint} value - The minimum allowed value.
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function Min(value: number | bigint): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new MinPipe(value));
  };
}
