import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA } from "src/domain/constants";
import { AppsScriptEventType } from "src/domain/enums";
import { OnInstall } from "src/controller/decorators/appsscript";

describe("@OnInstall: Positive", () => {
  it("should define APPSSCRIPT_EVENT_METADATA and APPSSCRIPT_OPTIONS_METADATA", () => {
    const options = { some: "option" };
    class TestClass {
      @OnInstall(options)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBe(
      AppsScriptEventType.INSTALL
    );
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodFunction)).toEqual(options);
  });

  it("should use empty object as default options", () => {
    class TestClass {
      @OnInstall()
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBe(
      AppsScriptEventType.INSTALL
    );
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodFunction)).toEqual({});
  });
});
