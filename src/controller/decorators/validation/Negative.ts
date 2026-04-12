import { addParamPipe } from "../../../repository";
import { NegativePipe } from "./pipes/NegativePipe";

/**
 * Parameter decorator for validating that a number or bigint is negative (< 0).
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function Negative(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new NegativePipe());
  };
}
