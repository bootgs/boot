import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { BootApplication } from "../../../../src/controller/BootApplication";
import { HttpController } from "../../../../src/controller/decorators/HttpController";
import { Event } from "../../../../src/controller/decorators/params/Event";

describe("BootApplication: Menu Handling", () => {
  it("should have Reflect.getMetadata", () => {
    expect(typeof Reflect.getMetadata).toBe("function");
  });

  it("should call controller method via menu proxy", async () => {
    const handlerSpy = vi.fn();

    @HttpController()
    class TestController {
      public testMethod() {
        handlerSpy();
      }
    }

    const app = new BootApplication({
      controllers: [ TestController ],
      providers: []
    });

    const menu = app.onMenu();
    const action = menu.testMethod;
    expect(typeof action).toBe("function");

    const result = action({} as any);
    expect(result).toBeInstanceOf(Promise);
    await result;

    expect(handlerSpy).toHaveBeenCalled();
  });

  it("should pass event to controller method via menu proxy with @Event decorator", async () => {
    let capturedEvent: unknown = null;

    @HttpController()
    class TestController {
      public testMethod(@Event() event: unknown) {
        capturedEvent = event;
      }
    }

    const app = new BootApplication({
      controllers: [ TestController ],
      providers: []
    });

    const menu = app.onMenu();
    const event = { source: "menu" };

    await menu.testMethod(event as any);

    expect(capturedEvent).toBe(event);
  });
});
