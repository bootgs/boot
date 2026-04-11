import { GUARDS_METADATA } from "../../../domain/constants";

/**
 * Decorator for applying guards to a controller or method.
 *
 * @param   {...any[]} guards - The guards to apply.
 * @returns {MethodDecorator & ClassDecorator} A decorator.
 */
export function UseGuards(...guards: any[]): MethodDecorator & ClassDecorator {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    target: object | Function,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ): void => {
    if (descriptor) {
      Reflect.defineMetadata(GUARDS_METADATA, guards, descriptor.value);
    } else {
      Reflect.defineMetadata(GUARDS_METADATA, guards, target);
    }
  };
}
