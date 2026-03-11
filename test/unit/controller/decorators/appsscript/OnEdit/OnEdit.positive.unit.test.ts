import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA } from "src/domain/constants";
import { AppsScriptEventType } from "src/domain/enums";
import { OnEdit } from "src/controller/decorators/appsscript";

describe("@OnEdit: Positive", () => {
  it("should define APPSSCRIPT_EVENT_METADATA and APPSSCRIPT_OPTIONS_METADATA", () => {
    const options = { some: "option" };
    class TestClass {
      @OnEdit(options)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBe(
      AppsScriptEventType.EDIT
    );
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodFunction)).toEqual(options);
  });

  it("should use empty object as default options", () => {
    class TestClass {
      @OnEdit()
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBe(
      AppsScriptEventType.EDIT
    );
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodFunction)).toEqual({});
  });
});
