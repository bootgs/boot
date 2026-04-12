import "reflect-metadata";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK
} from "../../domain/constants";

/**
 * Interface representing controller options.
 */
export interface ControllerOptions {
  /**
   * The base path for all routes in the controller.
   */
  basePath?: string;
}

/**
 * Decorator that marks a class as a controller.
 *
 * @param   {string} type - Controller type (e.g., 'http', 'sheets').
 * @param   {ControllerOptions} [options] - Controller options.
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```TypeScript
 * import { Controller, Get } from "bootgs";
 *
 * @Controller("http", { basePath: "/api" })
 * class MyController {
 *   @Get()
 *   findAll() {
 *     return [];
 *   }
 * }
 * ```
 */
export function Controller(type: string, options: ControllerOptions = {}): ClassDecorator {
  return (target: object): void => {
    const existingOptions: ControllerOptions =
      Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, target) || {};

    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);
    Reflect.defineMetadata(CONTROLLER_TYPE_METADATA, type, target);
    Reflect.defineMetadata(CONTROLLER_OPTIONS_METADATA, { ...existingOptions, ...options }, target);
  };
}
