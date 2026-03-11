import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { Query, RequestParam } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("@Query / @RequestParam: Positive", () => {
  it("should define correct metadata for a @Query with a key", () => {
    class TestController {
      testMethod(@Query("search") _search: string) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "QUERY:0": { type: ParamSource.QUERY, key: "search", index: 0 }
    });
  });

  it("should define correct metadata for a @Query without a key", () => {
    class TestController {
      testMethod(@Query() _queryParams: unknown) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "QUERY:0": { type: ParamSource.QUERY, key: undefined, index: 0 }
    });
  });

  it("RequestParam should be an alias for Query", () => {
    class TestController {
      testMethod(@RequestParam("sort") _sort: string) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "QUERY:0": { type: ParamSource.QUERY, key: "sort", index: 0 }
    });
  });
});
