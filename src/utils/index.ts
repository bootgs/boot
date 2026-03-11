import { InjectionToken, Newable } from "../domain/types";
import { Resolver, EventDispatcher } from "../service";

export function resolve<T>(
  controllers: Map<Newable, unknown>,
  providers: Map<InjectionToken, unknown>,
  token: InjectionToken<T>
): T {
  const resolver = new Resolver(controllers, providers);
  return resolver.resolve(token);
}

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
