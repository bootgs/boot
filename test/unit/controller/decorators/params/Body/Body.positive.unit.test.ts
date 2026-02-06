import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { Body, RequestBody } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@Body / @RequestBody: Positive", () => {
  it("should define correct metadata for a @Body with a key", () => {
    class TestController {
      testMethod(@Body("data") _data: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "BODY:0": { type: ParamSource.BODY, key: "data", index: 0 }
    });
  });

  it("should define correct metadata for a @Body without a key (full body injection)", () => {
    class TestController {
      testMethod(@Body() _fullBody: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "BODY:0": { type: ParamSource.BODY, key: undefined, index: 0 }
    });
  });

  it("RequestBody should be an alias for Body", () => {
    class TestController {
      testMethod(@RequestBody("user") _user: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "BODY:0": { type: ParamSource.BODY, key: "user", index: 0 }
    });
  });
});
