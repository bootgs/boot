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

describe("@Response: Positive", () => {
  it("should define correct metadata for @Response with a key", () => {
    class TestController {
      testMethod(@Response("status") _status: number) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "RESPONSE:0": { type: ParamSource.RESPONSE, key: "status", index: 0 }
    });
  });

  it("should define correct metadata for @Response without a key (full response object)", () => {
    class TestController {
      testMethod(@Response() _res: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "RESPONSE:0": { type: ParamSource.RESPONSE, key: undefined, index: 0 }
    });
  });
});
