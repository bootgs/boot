import { addParamPipe } from "../../../repository";
import { SizePipe } from "./pipes/SizePipe";

/**
 * Parameter decorator for validating the size of a string, array, map, or set.
 *
 * @param   {object} options - The size options.
 * @param   {number} [options.min=0] - The minimum size.
 * @param   {number} [options.max=Infinity] - The maximum size.
 * @returns {ParameterDecorator} A parameter decorator.
 */
export function Size(options: { min?: number; max?: number } = {}): ParameterDecorator {
  return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    addParamPipe(target, propertyKey, parameterIndex, new SizePipe(options));
  };
}
