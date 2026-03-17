import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { BootApplication } from "src/controller";
import { AppsScriptEventType } from "src/domain/enums";

describe("BootApplication: Positive", () => {
  it("should support different types of providers during initialization", () => {
    class ClassProvider {}
    const valueProvider = { provide: "TOKEN", useValue: "VALUE" };
    const classProvider = { provide: "SERVICE", useClass: class {} };
    const factoryProvider = { provide: "FACTORY", useFactory: () => ({}) };
    const existingProvider = { provide: "EXISTING", useExisting: "OTHER" };

    const app = new BootApplication({
      controllers: [],
      providers: [ ClassProvider, valueProvider, classProvider, factoryProvider, existingProvider ]
    });

    const providers = (app as unknown as { _providers: Map<unknown, unknown> })._providers;
    expect(providers.has(ClassProvider)).toBe(true);
    expect(providers.get("TOKEN")).toBe("VALUE");
    expect(providers.has("SERVICE")).toBe(true);
    expect(providers.has("FACTORY")).toBe(true);
    expect(providers.has("EXISTING")).toBe(true);
  });

  it("should dispatch INSTALL event on onInstall", async () => {
    const app = new BootApplication({ controllers: [] });
    const dispatchSpy = vi
      .spyOn(
        (app as unknown as { _eventDispatcher: { dispatch: () => Promise<void> } })
          ._eventDispatcher,
        "dispatch"
      )
      .mockResolvedValue(undefined);

    const event = {} as GoogleAppsScript.Events.AddonOnInstall;
    await app.onInstall(event);

    expect(dispatchSpy).toHaveBeenCalledWith(AppsScriptEventType.INSTALL, event);
  });

  it("should dispatch FORM_SUBMIT event on onFormSubmit", async () => {
    const app = new BootApplication({ controllers: [] });
    const dispatchSpy = vi
      .spyOn(
        (app as unknown as { _eventDispatcher: { dispatch: () => Promise<void> } })
          ._eventDispatcher,
        "dispatch"
      )
      .mockResolvedValue(undefined);

    const event = {} as GoogleAppsScript.Events.FormsOnFormSubmit;
    await app.onFormSubmit(event);

    expect(dispatchSpy).toHaveBeenCalledWith(AppsScriptEventType.FORM_SUBMIT, event);
  });
});
