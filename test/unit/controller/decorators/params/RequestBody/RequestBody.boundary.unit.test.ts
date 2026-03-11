import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { RequestBody } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@RequestBody: Boundary", () => {
  it("should handle multiple @RequestBody decorators on the same parameter", () => {
    class TestController {
      testMethod(@RequestBody("data") @RequestBody("raw") _body: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "BODY:0": { type: ParamSource.BODY, key: "data", index: 0 }
    });
  });
});
