import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { Body, Event, Headers, Param, Query, Request, Response } from "src/controller/decorators/params";
import { ParamSource } from "src/domain/enums";

function getParameterMetadata(
  target: object,
  propertyKey: string | symbol
): Record<string, unknown> {
  const metadataTarget = (target as { prototype: object }).prototype;
  return Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};
}

describe("HTTP Parameter Decorators: Integration", () => {
  it("should define correct metadata for multiple parameters in the same method", () => {
    class TestController {
      testMethod(
        @Param("userId") _id: string,
        @Query("search") _search: string,
        @Body() _body: unknown,
        @Event() _event: unknown,
        @Headers("Accept") _accept: string,
        @Request() _req: unknown,
        @Response("ok") _ok: boolean
      ) {}
    }

    const metadata = getParameterMetadata(TestController, "testMethod");
    expect(metadata).toEqual({
      "PARAM:0": { type: ParamSource.PARAM, key: "userId", index: 0 },
      "QUERY:1": { type: ParamSource.QUERY, key: "search", index: 1 },
      "BODY:2": { type: ParamSource.BODY, key: undefined, index: 2 },
      "EVENT:3": { type: ParamSource.EVENT, key: undefined, index: 3 },
      "HEADERS:4": { type: ParamSource.HEADERS, key: "Accept", index: 4 },
      "REQUEST:5": { type: ParamSource.REQUEST, key: undefined, index: 5 },
      "RESPONSE:6": { type: ParamSource.RESPONSE, key: "ok", index: 6 }
    });
  });

  it("should define correct metadata for parameters in different methods", () => {
    class TestController {
      methodOne(@Param("id") _id: string) {}
      methodTwo(@Query("page") _page: number) {}
    }

    const metadataOne = getParameterMetadata(TestController, "methodOne");
    expect(metadataOne).toEqual({
      "PARAM:0": { type: ParamSource.PARAM, key: "id", index: 0 }
    });

    const metadataTwo = getParameterMetadata(TestController, "methodTwo");
    expect(metadataTwo).toEqual({
      "QUERY:0": { type: ParamSource.QUERY, key: "page", index: 0 }
    });
  });
});
