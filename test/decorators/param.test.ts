import "reflect-metadata";
import { PARAM_DEFINITIONS_METADATA } from "src/config/constants";
import {
  Body,
  Event,
  Headers,
  Param,
  PathVariable,
  Query,
  Request,
  RequestBody,
  RequestParam,
  Response
} from "src/decorators";
import { ParamDefinition, ParamSource } from "src/types";
import { describe, expect, it } from "vitest";

function getParameterMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  target: Function,
  propertyKey: string | symbol
): Record<string, ParamDefinition> {
  const metadataTarget = target.prototype;

  const rawMetadata: Record<string, ParamDefinition> =
    Reflect.getMetadata(
      PARAM_DEFINITIONS_METADATA,
      metadataTarget,
      propertyKey
    ) || {};

  return rawMetadata;
}

describe("HTTP Parameter Decorators", () => {
  describe("@Param / @PathVariable", () => {
    it("should define correct metadata for a @Param with a key", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@Param("id") id: string) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: "id", index: 0 }
      });
    });

    it("should define correct metadata for a @Param without a key (full object injection)", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Param() params: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: undefined, index: 0 }
      });
    });

    it("PathVariable should be an alias for Param", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@PathVariable("name") name: string) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: "name", index: 0 }
      });
    });
  });

  describe("@Query / @RequestParam", () => {
    it("should define correct metadata for a @Query with a key", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@Query("search") search: string) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: "search", index: 0 }
      });
    });

    it("should define correct metadata for a @Query without a key", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@Query() queryParams: never) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: undefined, index: 0 }
      });
    });

    it("RequestParam should be an alias for Query", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@RequestParam("sort") sort: string) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: "sort", index: 0 }
      });
    });
  });

  describe("@Body / @RequestBody", () => {
    it("should define correct metadata for a @Body with a key", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@Body("data") data: never) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "BODY:0": { type: ParamSource.BODY, key: "data", index: 0 }
      });
    });

    it("should define correct metadata for a @Body without a key (full body injection)", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Body() fullBody: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "BODY:0": { type: ParamSource.BODY, key: undefined, index: 0 }
      });
    });

    it("RequestBody should be an alias for Body", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@RequestBody("user") user: never) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "BODY:0": { type: ParamSource.BODY, key: "user", index: 0 }
      });
    });
  });

  describe("@Event", () => {
    it("should define correct metadata for @Event", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Event() event: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "EVENT:0": { type: ParamSource.EVENT, key: undefined, index: 0 }
      });
    });

    it("should define key as passed for @Event if provided", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Event("someKey" as any) event: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "EVENT:0": { type: ParamSource.EVENT, key: "someKey", index: 0 }
      });
    });
  });

  describe("@Headers", () => {
    it("should define correct metadata for @Headers with a key", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@Headers("Authorization") auth: string) {}
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Headers() headers: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "HEADERS:0": { type: ParamSource.HEADERS, key: undefined, index: 0 }
      });
    });
  });

  describe("@Request", () => {
    it("should define correct metadata for @Request with a key", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@Request("method") method: string) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "REQUEST:0": { type: ParamSource.REQUEST, key: "method", index: 0 }
      });
    });

    it("should define correct metadata for @Request without a key (full request object)", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Request() req: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "REQUEST:0": { type: ParamSource.REQUEST, key: undefined, index: 0 }
      });
    });
  });

  describe("@Response", () => {
    it("should define correct metadata for @Response with a key", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testMethod(@Response("status") status: number) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "RESPONSE:0": { type: ParamSource.RESPONSE, key: "status", index: 0 }
      });
    });

    it("should define correct metadata for @Response without a key (full response object)", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Response() res: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "RESPONSE:0": { type: ParamSource.RESPONSE, key: undefined, index: 0 }
      });
    });
  });

  describe("Multiple Parameters and Methods", () => {
    it("should define correct metadata for multiple parameters in the same method", () => {
      class TestController {
        testMethod(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          @Param("userId") id: string,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          @Query("search") search: string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
          @Body() body: any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
          @Event() event: any,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          @Headers("Accept") accept: string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
          @Request() req: any,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          @Response("ok") ok: boolean
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        methodOne(@Param("id") id: string) {}

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        methodTwo(@Query("page") page: number) {}
      }

      const metadataOne = getParameterMetadata(TestController, "methodOne");
      expect(metadataOne).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: "id", index: 0 }
      });

      const metadataTwo = getParameterMetadata(TestController, "methodTwo");
      expect(metadataTwo).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: "page", index: 0 }
      });

      expect(metadataOne).not.toHaveProperty("QUERY:0");
      expect(metadataTwo).not.toHaveProperty("PARAM:0");
    });

    it("should correctly handle parameters with the same index but different methods", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        methodA(@Param("alpha") alpha: string) {}

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        methodB(@Query("beta") beta: string) {}
      }

      const metadataA = getParameterMetadata(TestController, "methodA");
      expect(metadataA).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: "alpha", index: 0 }
      });

      const metadataB = getParameterMetadata(TestController, "methodB");
      expect(metadataB).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: "beta", index: 0 }
      });
    });
  });

  describe("No Decorator Applied", () => {
    it("should not define any parameter metadata if no decorator is applied to a method", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        someMethod(arg1: string, arg2: number) {}
      }

      const metadata = getParameterMetadata(TestController, "someMethod");
      expect(metadata).toEqual({}); // Метаданных не должно быть
    });

    it("should not define any parameter metadata for a method that does not exist", () => {
      class TestController {
        existingMethod() {}
      }

      const metadata = getParameterMetadata(
        TestController,
        "nonExistentMethod"
      );
      expect(metadata).toEqual({});
    });
  });

  describe("Invalid/Unexpected Keys", () => {
    it("should store null as key if provided", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Param(null as any) param: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: null, index: 0 }
      });
    });

    it("should store empty string as key if provided", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Query("") query: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: "", index: 0 }
      });
    });

    it("should store number as key if provided (TS warning, but JS allows)", () => {
      class TestController {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        testMethod(@Body(123 as any) body: any) {}
      }

      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "BODY:0": { type: ParamSource.BODY, key: 123, index: 0 }
      });
    });
  });
});
