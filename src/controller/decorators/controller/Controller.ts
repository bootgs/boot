import "reflect-metadata";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK
} from "../../../domain/constants";

/**
 * Interface representing controller options.
 */
export interface ControllerOptions {

  /**
   * The base path for all routes in the controller.
   */
  basePath?: string;

  /**
   * Filter by sheet name (string, array, or RegExp).
   */
  sheetName?: string | string[] | RegExp;
}

/**
 * Decorator that marks a class as a controller.
 *
 * @param   {string} [type] - Controller type (e.g., 'http', 'sheets').
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
 *
 * @example
 * ```TypeScript
 * @Controller({ basePath: "/api" })
 * class MyController {}
 * ```
 *
 * @example
 * ```TypeScript
 * @Controller()
 * class MyController {}
 * ```
 */
export function Controller(): ClassDecorator;
export function Controller(type: string): ClassDecorator;
export function Controller(options: ControllerOptions): ClassDecorator;
export function Controller(type: string, options: ControllerOptions): ClassDecorator;
export function Controller(
  typeOrOptions?: string | ControllerOptions,
  options: ControllerOptions = {}
): ClassDecorator {
  return (target: object): void => {
    let type: string | undefined;
    let actualOptions: ControllerOptions = options;

    if (typeof typeOrOptions === "string") {
      type = typeOrOptions;
    } else if (typeof typeOrOptions === "object") {
      actualOptions = typeOrOptions;
    }

    const existingOptions: ControllerOptions =
      Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, target) || {};

    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);

    if (type !== undefined) {
      Reflect.defineMetadata(CONTROLLER_TYPE_METADATA, type, target);
    }

    Reflect.defineMetadata(
      CONTROLLER_OPTIONS_METADATA,
      { ...existingOptions, ...actualOptions },
      target
    );
  };
}
