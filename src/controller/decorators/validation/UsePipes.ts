import { PIPES_METADATA } from "../../../domain/constants";

/**
 * Decorator for applying pipes to a controller or method.
 *
 * @param   {...any[]} pipes - The pipes to apply.
 * @returns {MethodDecorator & ClassDecorator} A decorator.
 *
 * @example
 * ```TypeScript
 * import { UsePipes, Post, Body, HttpController, PipeTransform, ArgumentMetadata } from "bootgs";
 *
 * class CustomPipe implements PipeTransform {
 *   transform(value: any, metadata: ArgumentMetadata) {
 *     return `processed_${value}`;
 *   }
 * }
 *
 * @HttpController("/users")
 * class UsersController {
 *   @UsePipes(CustomPipe)
 *   @Post()
 *   create(@Body() user: any) {
 *     return user;
 *   }
 * }
 * ```
 */
export function UsePipes(...pipes: any[]): MethodDecorator & ClassDecorator {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    target: object | Function,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ): void => {
    if (descriptor) {
      Reflect.defineMetadata(PIPES_METADATA, pipes, descriptor.value);
    } else {
      Reflect.defineMetadata(PIPES_METADATA, pipes, target);
    }
  };
}
