import "reflect-metadata";
import { CONTROLLER_OPTIONS_METADATA, CONTROLLER_TYPE_METADATA, CONTROLLER_WATERMARK } from "../../domain/constants";

/**
 * Controller options.
 */
export interface ControllerOptions {
  basePath?: string;
}

/**
 * Decorator that marks a class as a controller.
 *
 * @param   {string} type - Controller type (e.g., 'http', 'sheets').
 * @param   {ControllerOptions} [options] - Controller options.
 * @returns {ClassDecorator} A class decorator.
 */
export function Controller(type: string, options: ControllerOptions = {}): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);
    Reflect.defineMetadata(CONTROLLER_TYPE_METADATA, type, target);
    Reflect.defineMetadata(CONTROLLER_OPTIONS_METADATA, options, target);
  };
}
