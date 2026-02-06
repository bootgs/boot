import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { PathVariable } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@PathVariable: Positive", () => {
  it("should define correct metadata for a @PathVariable with a key", () => {
    class TestController {
      testMethod(@PathVariable("id") _id: string) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "PARAM:0": { type: ParamSource.PARAM, key: "id", index: 0 }
    });
  });

  it("should define correct metadata for a @PathVariable without a key", () => {
    class TestController {
      testMethod(@PathVariable() __params: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "PARAM:0": { type: ParamSource.PARAM, key: undefined, index: 0 }
    });
  });
});
