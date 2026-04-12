import { addParamPipe } from "../../../repository";
import { NegativeOrZeroPipe } from "./pipes/NegativeOrZeroPipe";

/**
 * Parameter decorator for validating that a number or bigint is negative or zero (<= 0).
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function NegativeOrZero(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new NegativeOrZeroPipe());
  };
}
