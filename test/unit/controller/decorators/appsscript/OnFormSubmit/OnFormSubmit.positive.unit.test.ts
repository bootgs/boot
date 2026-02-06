import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA } from "src/domain/constants";
import { AppsScriptEventType } from "src/domain/enums";
import { OnFormSubmit } from "src/controller/decorators/appsscript";

describe("@OnFormSubmit: Positive", () => {
  it("should define APPSSCRIPT_EVENT_METADATA and APPSSCRIPT_OPTIONS_METADATA", () => {
    const options = { some: "option" };
    class TestClass {
      @OnFormSubmit(options)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBe(
      AppsScriptEventType.FORM_SUBMIT
    );
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodFunction)).toEqual(options);
  });

  it("should use empty object as default options", () => {
    class TestClass {
      @OnFormSubmit()
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBe(
      AppsScriptEventType.FORM_SUBMIT
    );
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodFunction)).toEqual({});
  });
});
