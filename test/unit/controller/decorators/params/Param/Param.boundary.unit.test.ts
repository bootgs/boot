import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { Param } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@Param: Boundary", () => {
  it("should store null as key if provided", () => {
    class TestController {
      testMethod(@Param(null as unknown as string) __param: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "PARAM:0": { type: ParamSource.PARAM, key: null, index: 0 }
    });
  });

  it("should store empty string as key if provided", () => {
    class TestController {
      testMethod(@Param("") __param: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "PARAM:0": { type: ParamSource.PARAM, key: "", index: 0 }
    });
  });
});
