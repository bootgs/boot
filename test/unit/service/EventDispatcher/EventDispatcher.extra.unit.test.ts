import "reflect-metadata";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EventDispatcher, Resolver } from "src/service";
import { AppsScriptEventType } from "src/domain/enums";
import { Event } from "src/controller/decorators/params";
import { Inject } from "src/controller/decorators";
import { OnChange, OnEdit, OnFormSubmit } from "src/controller/decorators/appsscript";

describe("EventDispatcher: Extra", () => {
  let resolver: Resolver;
  let dispatcher: EventDispatcher;

  beforeEach(() => {
    resolver = {
      resolve: vi.fn()
    } as unknown as Resolver;
  });

  it("should support RegExp in OnEdit filter", async () => {
    class TestController {
      public called = false;
      @OnEdit({ range: /^A\d+$/ })
      handle(@Event() _e: unknown) {
        this.called = true;
      }
    }
    const instance = new TestController();
    vi.mocked(resolver.resolve).mockReturnValue(instance);
    dispatcher = new EventDispatcher(resolver, new Map([[TestController, null]]));

    await dispatcher.dispatch(AppsScriptEventType.EDIT, { range: { getA1Notation: () => "A10" } });
    expect(instance.called).toBe(true);

    instance.called = false;
    await dispatcher.dispatch(AppsScriptEventType.EDIT, { range: { getA1Notation: () => "B1" } });
    expect(instance.called).toBe(false);
  });

  it("should return false if range notation is missing in EDIT event", async () => {
    class TestController {
      public called = false;
      @OnEdit({ range: "A1" })
      handle() {
        this.called = true;
      }
    }
    const instance = new TestController();
    vi.mocked(resolver.resolve).mockReturnValue(instance);
    dispatcher = new EventDispatcher(resolver, new Map([[TestController, null]]));

    await dispatcher.dispatch(AppsScriptEventType.EDIT, { range: {} }); // Missing getA1Notation
    expect(instance.called).toBe(false);
  });

  it("should filter OnFormSubmit by formId", async () => {
    class TestController {
      public called = false;
      @OnFormSubmit({ formId: "FORM_1" })
      handle() {
        this.called = true;
      }
    }
    const instance = new TestController();
    vi.mocked(resolver.resolve).mockReturnValue(instance);
    dispatcher = new EventDispatcher(resolver, new Map([[TestController, null]]));

    await dispatcher.dispatch(AppsScriptEventType.FORM_SUBMIT, {
      source: { getId: () => "FORM_1" }
    });
    expect(instance.called).toBe(true);

    instance.called = false;
    await dispatcher.dispatch(AppsScriptEventType.FORM_SUBMIT, {
      source: { getId: () => "FORM_2" }
    });
    expect(instance.called).toBe(false);
  });

  it("should return false if formId is missing in FORM_SUBMIT event", async () => {
    class TestController {
      public called = false;
      @OnFormSubmit({ formId: "FORM_1" })
      handle() {
        this.called = true;
      }
    }
    const instance = new TestController();
    vi.mocked(resolver.resolve).mockReturnValue(instance);
    dispatcher = new EventDispatcher(resolver, new Map([[TestController, null]]));

    await dispatcher.dispatch(AppsScriptEventType.FORM_SUBMIT, { source: {} }); // Missing getId
    expect(instance.called).toBe(false);
  });

  it("should return false if changeType is missing in CHANGE event", async () => {
    class TestController {
      public called = false;
      @OnChange({ changeType: "EDIT" })
      handle() {
        this.called = true;
      }
    }
    const instance = new TestController();
    vi.mocked(resolver.resolve).mockReturnValue(instance);
    dispatcher = new EventDispatcher(resolver, new Map([[TestController, null]]));

    await dispatcher.dispatch(AppsScriptEventType.CHANGE, {}); // Missing changeType
    expect(instance.called).toBe(false);
  });

  it("should support @Inject in event handlers", async () => {
    class Service {}
    class TestController {
      public injectedService: unknown;
      @OnEdit()
      handle(@Inject(Service) s: Service) {
        this.injectedService = s;
      }
    }
    const serviceInstance = new Service();
    const controllerInstance = new TestController();
    vi.mocked(resolver.resolve).mockImplementation((target: unknown) => {
      if (target === TestController) return controllerInstance;
      if (target === Service) return serviceInstance;
      return null;
    });

    dispatcher = new EventDispatcher(resolver, new Map([[TestController, null]]));

    await dispatcher.dispatch(AppsScriptEventType.EDIT, {
      range: { getA1Notation: () => "A1" }
    } as unknown as GoogleAppsScript.Events.SheetsOnEdit);
    expect(controllerInstance.injectedService).toBe(serviceInstance);
  });

  it("should handle injection failure in event handlers", async () => {
    class TestController {
      public injectedValue: unknown = "initial";
      @OnEdit()
      handle(@Inject("UNKNOWN") s: unknown) {
        this.injectedValue = s;
      }
    }
    const controllerInstance = new TestController();
    vi.mocked(resolver.resolve).mockImplementation((target: unknown) => {
      if (target === TestController) return controllerInstance;
      throw new Error("Resolve failed");
    });

    dispatcher = new EventDispatcher(resolver, new Map([[TestController, null]]));

    await dispatcher.dispatch(AppsScriptEventType.EDIT, {
      range: { getA1Notation: () => "A1" }
    } as unknown as GoogleAppsScript.Events.SheetsOnEdit);
    expect(controllerInstance.injectedValue).toBeUndefined();
  });
});
