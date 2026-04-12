import { normalize } from "apps-script-utils";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  METHOD_METADATA,
  PATH_METADATA
} from "../domain/constants";
import { Newable, RouteMetadata } from "../domain/types";
import { RequestMethod } from "../domain/enums";

/**
 * Explorer for identifying routes in controllers.
 */
export class RouterExplorer {
  /**
   * Explores the registered controllers and extracts route metadata.
   *
   * @param   {Map<Newable, unknown>} controllers - The registered controllers.
   * @returns {RouteMetadata[]} An array of extracted route metadata.
   */
  public explore(controllers: Map<Newable, unknown>): RouteMetadata[] {
    const routes: RouteMetadata[] = [];

    for (const controller of controllers.keys()) {
      const controllerType: string | null =
        Reflect.getMetadata(CONTROLLER_TYPE_METADATA, controller) || null;

      const isHttpController: boolean = controllerType === "http";

      if (!isHttpController) {
        continue;
      }

      const controllerOptions: Record<string, unknown> =
        Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, controller) || {};

      const basePath: string = (controllerOptions.basePath as string) || "/";

      const prototype: Record<string, unknown> = (controller as any).prototype;

      const propertyNames: string[] = Object.getOwnPropertyNames(prototype);

      for (const propertyName of propertyNames) {
        if (propertyName === "constructor") {
          continue;
        }

        const methodHandler: unknown = prototype[propertyName];

        const routePath: string | undefined = Reflect.getMetadata(
          PATH_METADATA,
          methodHandler as object
        );

        const requestMethods: RequestMethod | RequestMethod[] | undefined = Reflect.getMetadata(
          METHOD_METADATA,
          methodHandler as object
        );

        if (routePath && requestMethods) {
          const methods: RequestMethod[] = Array.isArray(requestMethods)
            ? requestMethods
            : [requestMethods];

          for (const method of methods) {
            routes.push({
              controller,
              handler: propertyName,
              method,
              path: decodeURI(normalize(`/${basePath}/${routePath}`))
            });
          }
        }
      }
    }

    return routes;
  }
}
