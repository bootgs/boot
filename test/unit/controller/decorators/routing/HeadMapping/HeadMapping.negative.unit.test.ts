import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";

describe("@HeadMapping: Negative", () => {
  it("should not define metadata if decorator is not applied", () => {
    class TestClass {
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBeUndefined();
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBeUndefined();
  });
});
