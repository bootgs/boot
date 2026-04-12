import { addParamPipe } from "../../../repository";
import { PatternPipe } from "./pipes/PatternPipe";

/**
 * Parameter decorator for validating a string against a regular expression.
 *
 * @param   {string | RegExp} value - The regular expression to match.
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function Pattern(value: string | RegExp): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new PatternPipe(value));
  };
}
