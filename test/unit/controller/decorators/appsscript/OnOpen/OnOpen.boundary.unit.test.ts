import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA } from "src/domain/constants";
import { AppsScriptEventType } from "src/domain/enums";
import { OnOpen } from "src/controller/decorators/appsscript";

describe("@OnOpen: Boundary", () => {
  it("should handle multiple decorators (last one wins)", () => {
    class TestClass {
      @OnOpen({ id: 1 })
      @OnOpen({ id: 2 })
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBe(
      AppsScriptEventType.OPEN
    );
    expect(Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodFunction)).toEqual({ id: 1 });
  });
});
