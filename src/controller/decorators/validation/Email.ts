import { addParamPipe } from "../../../repository";
import { EmailPipe } from "./pipes/EmailPipe";

/**
 * Parameter decorator for validating that a string is a valid email address.
 *
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function Email(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new EmailPipe());
  };
}
