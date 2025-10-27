import { isFunctionLike } from "apps-script-utils";
import { PARAMTYPES_METADATA } from "../config/constants";
import { Newable, ParamSource } from "../types";
import { getInjectionTokens, isController, isInjectable } from "../utils";

/**
 * Resolves a class (Controller or Provider) and its dependencies from the DI container.
 *
 * @template T - The type of the class to resolve.
 * @param    controllers
 * @param    providers
 * @param    target - The constructor function of the class to be resolved.
 * This class should typically be decorated with `@Injectable()` or `@SheetsController()`.
 * @returns  {T} An instance of the target class with all its dependencies injected.
 */
export function resolve<T>(
  controllers: Map<Newable, T | unknown>,
  providers: Map<Newable, T | unknown>,
  target: Newable<T>
): T {
  if (controllers.has(target)) {
    const instance = controllers.get(target);

    if (instance) {
      return instance as T;
    }
  }

  if (providers.has(target)) {
    const instance = providers.get(target);

    if (instance) {
      return instance as T;
    }
  }

  const designParamTypes: Newable[] =
    Reflect.getMetadata(PARAMTYPES_METADATA, target) || [];

  const explicitInjectTokens = getInjectionTokens(target);

  const deps = new Array(
    Math.max(designParamTypes.length, Object.keys(explicitInjectTokens).length)
  );

  for (let i = 0; i < deps.length; i++) {
    const paramKey = `${ParamSource.INJECT}:${i}`;
    const injectDefinition = explicitInjectTokens[paramKey];
    const tokenToResolve = injectDefinition
      ? injectDefinition.token
      : designParamTypes[i];

    if (!isFunctionLike(tokenToResolve)) {
      throw new Error(
        `[Resolve ERROR]: Invalid injection token at index ${i} of '${target.name}'. Expected a class constructor.`
      );
    }

    if (!providers.has(tokenToResolve) && !controllers.has(tokenToResolve)) {
      throw new Error(
        `[Resolve ERROR]: '${tokenToResolve.name}' is not registered as a provider or controller.`
      );
    }

    deps[i] = resolve(controllers, providers, tokenToResolve);
  }

  const instance = new target(...deps);

  if (isController(target)) {
    controllers.set(target, instance);
  } else if (isInjectable(target)) {
    providers.set(target, instance);
  } else {
    console.warn(
      `[Resolve WARN] ${target.name} is not registered as a provider and is not marked @Controller() or @Injectable().`
    );
  }

  return instance;
}
