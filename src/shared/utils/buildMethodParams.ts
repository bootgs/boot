import { InjectionToken, Newable } from "../../domain/types";
import { EventDispatcher, Resolver } from "../../service";

/**
 * Builds the parameters for a method call in a controller.
 *
 * @param {object} target The target controller instance.
 * @param {string | symbol} methodName The name of the method.
 * @param {object} context The context containing the event object.
 * @param {object} context.event The event object.
 * @param {Map<Newable, unknown>} controllers The controllers map.
 * @param {Map<InjectionToken, unknown>} providers The providers map.
 * @returns {unknown[]} The array of parameters for the method call.
 */
export function buildMethodParams(
  target: object,
  methodName: string | symbol,
  context: { event: unknown },
  controllers: Map<Newable, unknown>,
  providers: Map<InjectionToken, unknown>
): unknown[] {
  const resolver = new Resolver(controllers, providers);
  const dispatcher = new EventDispatcher(resolver, controllers);
  return dispatcher.buildMethodParams(target, methodName, context.event);
}
