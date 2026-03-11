import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { Response } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@Response: Boundary", () => {
  it("should store null as key if provided", () => {
    class TestController {
      testMethod(@Response(null as unknown as string) _res: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "RESPONSE:0": { type: ParamSource.RESPONSE, key: null, index: 0 }
    });
  });
});
