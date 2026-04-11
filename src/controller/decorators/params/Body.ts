import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting the full request body.
 *
 * @param   {string} [key] - The name of a key to extract a specific value from the request body.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```typescript
 * @Post()
 * create(@Body() dto: CreateDto) {}
 *
 * @Post()
 * createField(@Body('name') name: string) {}
 * ```
 */
export const Body = createParamDecorator(ParamSource.BODY);
