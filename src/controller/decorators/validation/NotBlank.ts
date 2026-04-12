import { addParamPipe } from "../../../repository";
import { NotBlankPipe } from "./pipes/NotBlankPipe";

/**
 * Parameter decorator for validating that a string is not null, empty, or only contains whitespace.
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function NotBlank(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new NotBlankPipe());
  };
}
