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

describe("@RequestBody: Negative", () => {
  it("should not define any parameter metadata if no decorator is applied", () => {
    class TestController {
      someMethod(_arg1: string) {}
    }

    const metadata = getParameterMetadata(TestController, "someMethod");
    expect(metadata).toEqual({});
  });
});
