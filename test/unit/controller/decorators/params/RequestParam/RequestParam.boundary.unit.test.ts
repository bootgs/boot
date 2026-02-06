import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { RequestParam } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@RequestParam: Boundary", () => {
  it("should handle multiple @RequestParam decorators on the same parameter", () => {
    class TestController {
      testMethod(@RequestParam("name") @RequestParam("alias") _name: string) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "QUERY:0": { type: ParamSource.QUERY, key: "name", index: 0 }
    });
  });
});
