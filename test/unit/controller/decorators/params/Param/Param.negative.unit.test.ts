import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@Param: Negative", () => {
  it("should not define any parameter metadata if no decorator is applied to a method", () => {
    class TestController {
      someMethod(_arg1: string, _arg2: number) {}
    }

    const metadata = getParameterMetadata(TestController, "someMethod");
    expect(metadata).toEqual({});
  });

  it("should not define any parameter metadata for a method that does not exist", () => {
    class TestController {
      existingMethod() {}
    }

    const metadata = getParameterMetadata(TestController, "nonExistentMethod");
    expect(metadata).toEqual({});
  });
});
