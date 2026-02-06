import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA } from "src/domain/constants";
import { AppsScriptEventType } from "src/domain/enums";
import { OnFormSubmit } from "src/controller/decorators/appsscript";

describe("@OnFormSubmit: Boundary", () => {
  it("should handle multiple decorators (last one wins)", () => {
    class TestClass {
      @OnFormSubmit({ id: 1 })
      @OnFormSubmit({ id: 2 })
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBe(
      AppsScriptEventType.FORM_SUBMIT
    );
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodFunction)).toEqual({ id: 1 });
  });
});
