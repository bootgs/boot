import { isFunctionLike } from "apps-script-utils";
import { InjectionToken, InjectTokenDefinition, Newable } from "../domain/types";
import { ParamSource } from "../domain/enums";
import { PARAMTYPES_METADATA } from "../domain/constants";
import { getInjectionTokens } from "../repository";
import { isController, isInjectable } from "../shared/utils";

/**
 * Dependency injection resolver.
 */
export class Resolver {
  /**
   * Creates a new instance of Resolver.
   *
   * @param {Map<InjectionToken, unknown>} _controllers - Registered controllers.
   * @param {Map<InjectionToken, unknown>} _providers - Registered providers.
   * @param {Record<string, any>} _config - Application configuration.
   */
  constructor(
    private readonly _controllers: Map<InjectionToken, unknown>,
    private readonly _providers: Map<InjectionToken, unknown>,
    private readonly _config: Record<string, any> = {}
  ) {}

  /**
   * Resolves a dependency by its injection token.
   *
   * @param   {InjectionToken<T>} token - The injection token.
   * @returns {T} The resolved instance.
   * @throws  {Error} If the dependency cannot be resolved.
   */
  public resolve<T>(token: InjectionToken<T>): T {
    if (this._controllers.has(token)) {
      const instance: unknown = this._controllers.get(token);

      if (instance) return instance as T;
    }

    if (this._providers.has(token)) {
      const instance: unknown = this._providers.get(token);

      if (instance) return instance as T;
    }

    if (!isFunctionLike(token)) {
      const tokenName: string = String(token);

      throw new Error(
        `[Resolve ERROR]: '${tokenName}' is not registered as a provider or controller.`
      );
    }

    const target: Newable<T> = token as Newable<T>;

    const designParamTypes: Newable[] = Reflect.getMetadata(PARAMTYPES_METADATA, target) || [];

    const explicitInjectTokens: Record<string, InjectTokenDefinition> = getInjectionTokens(target);

    const deps: unknown[] = new Array(
      Math.max(target.length, designParamTypes.length, Object.keys(explicitInjectTokens).length)
    );

    for (let i: number = 0; i < deps.length; i++) {
      const paramKey: string = `${ParamSource.INJECT}:${i}`;

      const injectDefinition: InjectTokenDefinition | undefined = explicitInjectTokens[ paramKey ];

      if (injectDefinition && injectDefinition.type === ParamSource.VALUE) {
        deps[ i ] = this.resolveConfigValue(injectDefinition.token as string);
        continue;
      }

      const tokenToResolve: InjectionToken | undefined = injectDefinition
        ? injectDefinition.token
        : designParamTypes[ i ];

      if (!tokenToResolve) {
        throw new Error(
          `[Resolve ERROR]: Dependency at index ${i} of '${target.name}' cannot be resolved (no token).`
        );
      }

      if (!this._providers.has(tokenToResolve) && !this._controllers.has(tokenToResolve)) {
        if (!isFunctionLike(tokenToResolve)) {
          throw new Error(
            `[Resolve ERROR]: Invalid injection token at index ${i} of '${target.name}'. Expected a class constructor or a registered token.`
          );
        }

        const tokenName: string = isFunctionLike(tokenToResolve)
          ? tokenToResolve.name
          : String(tokenToResolve);

        throw new Error(
          `[Resolve ERROR]: '${tokenName}' is not registered as a provider or controller.`
        );
      }

      deps[ i ] = isFunctionLike(tokenToResolve)
        ? this.resolve(tokenToResolve)
        : this._providers.get(tokenToResolve);
    }

    const instance: T = Reflect.construct(target, deps);

    if (isController(target)) {
      this._controllers.set(target, instance);
    } else if (isInjectable(target)) {
      this._providers.set(target, instance);
    } else {
      console.warn(
        `[Resolve ERROR]: '${target.name}' is not registered as a provider or controller.`
      );
    }

    return instance;
  }

  /**
   * Resolves a configuration value by its key.
   * Supports nested keys (e.g., "app.name").
   *
   * @param {string} key The configuration key.
   * @returns {unknown} The resolved value.
   */
  private resolveConfigValue(key: string): unknown {
    if (!key) return undefined;

    const parts = key.split(".");
    let current: any = this._config;

    for (const part of parts) {
      if (current === null || typeof current !== "object") {
        return undefined;
      }
      current = current[ part ];
    }

    return current;
  }
}
