import { InjectionToken, Newable } from "../../domain/types";
import { Resolver } from "../../service";

/**
 * Resolves a token from the provided controllers and providers.
 *
 * @param {Map<Newable, unknown>} controllers The controllers map.
 * @param {Map<InjectionToken, unknown>} providers The providers map.
 * @param {InjectionToken<T>} token The token to resolve.
 * @returns {T} The resolved instance.
 */
export function resolve<T>(
  controllers: Map<Newable, unknown>,
  providers: Map<InjectionToken, unknown>,
  token: InjectionToken<T>
): T {
  const resolver = new Resolver(controllers, providers);
  return resolver.resolve(token);
}
