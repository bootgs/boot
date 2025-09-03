import { isUndefined } from "appsscript-utils";
import { Newable, ParamSource } from "types";
import { getInjectionTokens, isController, isInjectable } from "utils";
import { PARAMTYPES_METADATA } from "config/constants";

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

  const deps = designParamTypes.map((type, index) => {
    const paramKey = `${ParamSource.INJECT}:${index}`;
    const injectDefinition = explicitInjectTokens[paramKey];
    const tokenToResolve = injectDefinition ? injectDefinition.token : type;

    if (!tokenToResolve) {
      return undefined;
    }

    return resolve(controllers, providers, tokenToResolve);
  });

  if (deps.some(isUndefined)) {
    throw new Error(`Could not resolve all dependencies for ${target.name}`);
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
