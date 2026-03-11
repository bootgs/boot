import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { createAppsScriptDecorator } from "src/repository";
import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA } from "src/domain/constants";
import { AppsScriptEventType } from "src/domain/enums";

describe("createAppsScriptDecorator: positive", () => {
  it("should define correct metadata on method", () => {
    const eventType = AppsScriptEventType.OPEN;
    const options = { foo: "bar" };
    const decorator = createAppsScriptDecorator(eventType);
    const methodDecorator = decorator(options);

    class Test {
      method() {}
    }

    const descriptor = Object.getOwnPropertyDescriptor(Test.prototype, "method")!;
    methodDecorator(Test.prototype, "method", descriptor);

    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, Test.prototype.method)).toBe(eventType);
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, Test.prototype.method)).toEqual(
      options
    );
  });
});
