import { isFunctionLike } from "apps-script-utils";
import { InjectionToken, Newable } from "domain/types";
import { ParamSource } from "domain/enums";
import { PARAMTYPES_METADATA } from "domain/constants";
import { getInjectionTokens } from "repository";
import { isController, isInjectable } from "shared/utils";

export class Resolver {
  constructor(
    private readonly _controllers: Map<InjectionToken, unknown>,
    private readonly _providers: Map<InjectionToken, unknown>
  ) {}

  public resolve<T>(token: InjectionToken<T>): T {
    if (this._controllers.has(token)) {
      const instance = this._controllers.get(token);

      if (instance) return instance as T;
    }

    if (this._providers.has(token)) {
      const instance = this._providers.get(token);

      if (instance) return instance as T;
    }

    if (!isFunctionLike(token)) {
      const tokenName = String(token);

      throw new Error(
        `[Resolve ERROR]: '${tokenName}' is not registered as a provider or controller.`
      );
    }

    const target = token as Newable<T>;

    const designParamTypes: Newable[] = Reflect.getMetadata(PARAMTYPES_METADATA, target) || [];

    const explicitInjectTokens = getInjectionTokens(target);

    const deps = new Array(
      Math.max(target.length, designParamTypes.length, Object.keys(explicitInjectTokens).length)
    );

    for (let i = 0; i < deps.length; i++) {
      const paramKey = `${ParamSource.INJECT}:${i}`;

      const injectDefinition = explicitInjectTokens[ paramKey ];

      const tokenToResolve = injectDefinition ? injectDefinition.token : designParamTypes[ i ];

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

        const tokenName =
          typeof tokenToResolve === "function" ? tokenToResolve.name : String(tokenToResolve);

        throw new Error(
          `[Resolve ERROR]: '${tokenName}' is not registered as a provider or controller.`
        );
      }

      deps[ i ] = isFunctionLike(tokenToResolve)
        ? this.resolve(tokenToResolve as Newable)
        : this._providers.get(tokenToResolve);
    }

    const TargetClass = target as unknown as new (...args: unknown[]) => T;
    const instance = new TargetClass(...deps);

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
}
