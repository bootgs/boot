import { normalize } from "apps-script-utils";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  METHOD_METADATA,
  PATH_METADATA
} from "../config/constants";
import { Newable, RouteMetadata } from "../types";

export class RouterExplorer {
  static explore(controllers: Map<Newable, unknown>): RouteMetadata[] {
    const routes: RouteMetadata[] = [];

    for (const controller of controllers.keys()) {
      const controllerType: string | null =
        Reflect.getMetadata(CONTROLLER_TYPE_METADATA, controller) || null;

      const isHttpController = controllerType === "http";

      if (!isHttpController) continue;

      const controllerOptions =
        Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, controller) || {};

      const basePath = controllerOptions.basePath || "/";

      const prototype = controller.prototype;
      const propertyNames = Object.getOwnPropertyNames(prototype);

      for (const propertyName of propertyNames) {
        if (propertyName === "constructor") continue;

        const methodHandler = prototype[propertyName];
        const routePath = Reflect.getMetadata(PATH_METADATA, methodHandler);
        const requestMethod = Reflect.getMetadata(
          METHOD_METADATA,
          methodHandler
        );

        if (routePath && requestMethod) {
          routes.push({
            controller,
            handler: propertyName,
            method: requestMethod,
            path: decodeURI(normalize(`/${basePath}/${routePath}`))
          });
        }
      }
    }

    return routes;
  }
}
