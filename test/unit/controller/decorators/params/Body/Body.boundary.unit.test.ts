import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { Body } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@Body: Boundary", () => {
  it("should store number as key if provided (TS warning, but JS allows)", () => {
    class TestController {
      testMethod(@Body(123 as unknown as string) _body: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "BODY:0": { type: ParamSource.BODY, key: 123, index: 0 }
    });
  });
});
