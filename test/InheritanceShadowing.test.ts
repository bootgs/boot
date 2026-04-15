import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { ExceptionHandler, Get, OnOpen, RestController } from "../src/controller/decorators";
import { RouterExplorer } from "../src/service/RouterExplorer";
import { EventDispatcher } from "../src/service/EventDispatcher";
import { Router } from "../src/service/Router";
import { Resolver } from "../src/service/Resolver";
import { Newable } from "../src/domain/types";
import { AppsScriptEventType } from "../src/domain/enums";

describe("Inheritance Professionalism & Reliability", () => {
  describe("RouterExplorer Shadowing", () => {
    it("should NOT register a route if it is overridden without a decorator", () => {
      abstract class BaseController {
        @Get("/ping")
        ping() {
          return "base";
        }
      }

      @RestController("/example")
      class ChildController extends BaseController {
        override ping() {
          return "child";
        }
      }

      const explorer = new RouterExplorer();
      const controllers = new Map<Newable, unknown>();
      controllers.set(ChildController, null);

      const routes = explorer.explore(controllers);
      expect(routes.find((r) => r.handler === "ping")).toBeUndefined();
    });

    it("should register a route if it is NOT overridden", () => {
      abstract class BaseController {
        @Get("/ping")
        ping() {
          return "base";
        }
      }

      @RestController("/example")
      class ChildController extends BaseController {}

      const explorer = new RouterExplorer();
      const controllers = new Map<Newable, unknown>();
      controllers.set(ChildController, null);

      const routes = explorer.explore(controllers);
      expect(routes.find((r) => r.handler === "ping")).toBeDefined();
    });
  });

  describe("EventDispatcher Shadowing", () => {
    it("should NOT dispatch an event if the handler is overridden without a decorator", () => {
      abstract class BaseController {
        @OnOpen()
        onOpen() {}
      }

      @RestController()
      class ChildController extends BaseController {
        override onOpen() {}
      }

      const controllers = new Map<Newable, unknown>();
      controllers.set(ChildController, new ChildController());

      const resolver = {
        resolve: (c: Newable) => controllers.get(c)
      } as Resolver;

      const dispatcher = new EventDispatcher(resolver, controllers);

      // We'll spy on the child's onOpen
      const spy = vi.spyOn(ChildController.prototype, "onOpen");

      dispatcher.dispatch(AppsScriptEventType.OPEN, {});

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("ExceptionHandler Inheritance", () => {
    it("should find and call an inherited exception handler", async () => {
      abstract class BaseController {
        @ExceptionHandler(Error)
        handleError(err: Error) {
          return "handled by base";
        }
      }

      @RestController()
      class ChildController extends BaseController {
        @Get("/error")
        throwError() {
          throw new Error("test");
        }
      }

      const instance = new ChildController();
      const controllers = new Map<Newable, unknown>();
      controllers.set(ChildController, instance);

      const resolver = {
        resolve: (c: Newable) => instance
      } as Resolver;

      const router = new Router(resolver, [], []);

      // Accessing private method for testing purpose
      const handlerName = (router as any).findExceptionHandler(new Error("test"), instance);
      expect(handlerName).toBe("handleError");
    });

    it("should NOT call an inherited exception handler if it is overridden without a decorator", () => {
      abstract class BaseController {
        @ExceptionHandler(Error)
        handleError(err: Error) {
          return "handled by base";
        }
      }

      @RestController()
      class ChildController extends BaseController {
        override handleError(err: Error) {
          return "handled by child";
        }
      }

      const instance = new ChildController();
      const resolver = { resolve: () => instance } as any;
      const router = new Router(resolver, [], []);

      const handlerName = (router as any).findExceptionHandler(new Error("test"), instance);
      expect(handlerName).toBeNull();
    });
  });
});
