import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { Request } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@Request: Positive", () => {
  it("should define correct metadata for @Request with a key", () => {
    class TestController {
      testMethod(@Request("method") _method: string) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "REQUEST:0": { type: ParamSource.REQUEST, key: "method", index: 0 }
    });
  });

  it("should define correct metadata for @Request without a key (full request object)", () => {
    class TestController {
      testMethod(@Request() _req: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "REQUEST:0": { type: ParamSource.REQUEST, key: undefined, index: 0 }
    });
  });
});
