import { addParamPipe } from "../../../repository";
import { NotEmptyPipe } from "./pipes/NotEmptyPipe";

/**
 * Parameter decorator for validating that a value is not null, undefined, or empty.
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function NotEmpty(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new NotEmptyPipe());
  };
}
