import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";

describe("@Delete: Negative", () => {
  it("should not define metadata if the decorator is not applied", () => {
    class TestClass {
      anotherMethod() {}
    }
    const methodFunction = TestClass.prototype.anotherMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBeUndefined();
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBeUndefined();
  });
});
