import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { BootApplication } from "../../../../src/controller/BootApplication";
import { HttpController } from "../../../../src/controller/decorators/HttpController";
import { Event } from "../../../../src/controller/decorators/params/Event";

describe("BootApplication: Menu Handling", () => {
  it("should have Reflect.getMetadata", () => {
    expect(typeof Reflect.getMetadata).toBe("function");
  });

  it("should call controller method via menu proxy", () => {
    const handlerSpy = vi.fn();

    @HttpController()
    class TestController {
      public testMethod() {
        handlerSpy();
      }
    }

    const app = new BootApplication({
      controllers: [TestController],
      providers: []
    });

    const menu = app.onMenu;
    const action = menu.testMethod;
    expect(typeof action).toBe("function");

    action({} as any);

    expect(handlerSpy).toHaveBeenCalled();
  });

  it("should pass event to controller method via menu proxy with @Event decorator", () => {
    let capturedEvent: unknown = null;

    @HttpController()
    class TestController {
      public testMethod(@Event() event: unknown) {
        capturedEvent = event;
      }
    }

    const app = new BootApplication({
      controllers: [TestController],
      providers: []
    });

    const menu = app.onMenu;
    const event = { source: "menu" };

    menu.testMethod(event as any);

    expect(capturedEvent).toBe(event);
  });

  it("should return proxy when accessed as a property", () => {
    const app = new BootApplication({ controllers: [], providers: [] });
    const menu = (app as any).onMenu;
    expect(typeof menu).toBe("function");
    expect(typeof menu.openSidebarHome).toBe("function");
  });

  it("should return same proxy when called as a function", () => {
    const app = new BootApplication({ controllers: [], providers: [] });
    const menu = app.onMenu;
    const result = (menu as any)();
    expect(result).toBe(menu);
  });
});
