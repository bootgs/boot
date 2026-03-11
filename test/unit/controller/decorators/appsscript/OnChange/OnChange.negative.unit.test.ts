import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { APPSSCRIPT_EVENT_METADATA } from "src/domain/constants";

describe("@OnChange: Negative", () => {
  it("should not define metadata if decorator is not applied", () => {
    class TestClass {
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodFunction)).toBeUndefined();
  });
});
