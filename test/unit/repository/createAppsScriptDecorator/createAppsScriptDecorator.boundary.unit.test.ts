import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { createAppsScriptDecorator } from "src/repository";
import { APPSSCRIPT_OPTIONS_METADATA } from "src/domain/constants";
import { AppsScriptEventType } from "src/domain/enums";

describe("createAppsScriptDecorator: boundary", () => {
  it("should use empty object as default options", () => {
    const decorator = createAppsScriptDecorator(AppsScriptEventType.EDIT);
    const methodDecorator = decorator(); // No options provided

    class Test {
      method() {}
    }

    const descriptor = Object.getOwnPropertyDescriptor(Test.prototype, "method")!;
    methodDecorator(Test.prototype, "method", descriptor);

    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, Test.prototype.method)).toEqual({});
  });
});
