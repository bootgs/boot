import { ROLES_METADATA } from "../../../domain/constants";

/**
 * Decorator for assigning roles to a controller or method.
 *
 * @param   {...string[]} roles - The roles to assign.
 * @returns {MethodDecorator & ClassDecorator} A decorator.
 */
export function Roles(...roles: string[]): MethodDecorator & ClassDecorator {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    target: object | Function,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ): void => {
    if (descriptor) {
      Reflect.defineMetadata(ROLES_METADATA, roles, descriptor.value);
    } else {
      Reflect.defineMetadata(ROLES_METADATA, roles, target);
    }
  };
}
