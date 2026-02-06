import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { Headers } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@Headers: Positive", () => {
  it("should define correct metadata for @Headers with a key", () => {
    class TestController {
      testMethod(@Headers("Authorization") _auth: string) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "HEADERS:0": {
        type: ParamSource.HEADERS,
        key: "Authorization",
        index: 0
      }
    });
  });

  it("should define correct metadata for @Headers without a key (full headers object)", () => {
    class TestController {
      testMethod(@Headers() _headers: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "HEADERS:0": { type: ParamSource.HEADERS, key: undefined, index: 0 }
    });
  });
});
