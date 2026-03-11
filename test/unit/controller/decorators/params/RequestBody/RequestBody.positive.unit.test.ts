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

describe("@RequestBody: Positive", () => {
  it("should define correct metadata for a @RequestBody with a key", () => {
    class TestController {
      testMethod(@RequestBody("data") _data: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "BODY:0": { type: ParamSource.BODY, key: "data", index: 0 }
    });
  });

  it("should define correct metadata for a @RequestBody without a key", () => {
    class TestController {
      testMethod(@RequestBody() _body: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "BODY:0": { type: ParamSource.BODY, key: undefined, index: 0 }
    });
  });
});
