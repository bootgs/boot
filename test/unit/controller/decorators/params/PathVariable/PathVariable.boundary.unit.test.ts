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

describe("@PathVariable: Boundary", () => {
  it("should handle multiple @PathVariable decorators on the same parameter", () => {
    class TestController {
      testMethod(@PathVariable("id") @PathVariable("alias") _id: string) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    // Usually the one closest to the parameter wins, or they overwrite each other.
    // In our implementation (assignParamMetadata), it uses the same key for the map "TYPE:INDEX".
    // So the last one (outermost in decorator execution order) wins?
    // Wait, decorators are executed bottom-up.
    // @D1
    // @D2
    // method(@D3 param)
    // D3 runs first.

    // In our case: @PathVariable("id") @PathVariable("alias") id
    // "alias" is D2, "id" is D1. D2 runs first, then D1.
    // So "id" should win.

    expect(metadata).toEqual({
      "PARAM:0": { type: ParamSource.PARAM, key: "id", index: 0 }
    });
  });
});
