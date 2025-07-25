var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
import "reflect-metadata";
import {
  Body,
  Event,
  Headers,
  Param,
  ParamSource,
  PathVariable,
  Query,
  Request,
  RequestBody,
  RequestParam,
  Response
} from "@/types";
import { PARAM_DEFINITIONS_METADATA } from "@/appsscript/utils/boot/config/constants";
import { describe, expect, it } from "vitest";

function getParameterMetadata(target, propertyKey) {
  const metadataTarget = target.prototype;
  const rawMetadata =
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
        testMethod(id) {}
      }

      __decorate(
        [
          __param(0, Param("id")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: "id", index: 0 }
      });
    });
    it("should define correct metadata for a @Param without a key (full object injection)", () => {
      class TestController {
        testMethod(params) {}
      }

      __decorate(
        [
          __param(0, Param()),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: undefined, index: 0 }
      });
    });
    it("PathVariable should be an alias for Param", () => {
      class TestController {
        testMethod(name) {}
      }

      __decorate(
        [
          __param(0, PathVariable("name")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: "name", index: 0 }
      });
    });
  });
  describe("@Query / @RequestParam", () => {
    it("should define correct metadata for a @Query with a key", () => {
      class TestController {
        testMethod(search) {}
      }

      __decorate(
        [
          __param(0, Query("search")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: "search", index: 0 }
      });
    });
    it("should define correct metadata for a @Query without a key", () => {
      class TestController {
        testMethod(queryParams) {}
      }

      __decorate(
        [
          __param(0, Query()),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: undefined, index: 0 }
      });
    });
    it("RequestParam should be an alias for Query", () => {
      class TestController {
        testMethod(sort) {}
      }

      __decorate(
        [
          __param(0, RequestParam("sort")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: "sort", index: 0 }
      });
    });
  });
  describe("@Body / @RequestBody", () => {
    it("should define correct metadata for a @Body with a key", () => {
      class TestController {
        testMethod(data) {}
      }

      __decorate(
        [
          __param(0, Body("data")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "BODY:0": { type: ParamSource.BODY, key: "data", index: 0 }
      });
    });
    it("should define correct metadata for a @Body without a key (full body injection)", () => {
      class TestController {
        testMethod(fullBody) {}
      }

      __decorate(
        [
          __param(0, Body()),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "BODY:0": { type: ParamSource.BODY, key: undefined, index: 0 }
      });
    });
    it("RequestBody should be an alias for Body", () => {
      class TestController {
        testMethod(user) {}
      }

      __decorate(
        [
          __param(0, RequestBody("user")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "BODY:0": { type: ParamSource.BODY, key: "user", index: 0 }
      });
    });
  });
  describe("@Event", () => {
    it("should define correct metadata for @Event", () => {
      class TestController {
        testMethod(event) {}
      }

      __decorate(
        [
          __param(0, Event()),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "EVENT:0": { type: ParamSource.EVENT, key: undefined, index: 0 }
      });
    });
    it("should define key as passed for @Event if provided", () => {
      class TestController {
        testMethod(event) {}
      }

      __decorate(
        [
          __param(0, Event("someKey")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "EVENT:0": { type: ParamSource.EVENT, key: "someKey", index: 0 }
      });
    });
  });
  describe("@Headers", () => {
    it("should define correct metadata for @Headers with a key", () => {
      class TestController {
        testMethod(auth) {}
      }

      __decorate(
        [
          __param(0, Headers("Authorization")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
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
        testMethod(headers) {}
      }

      __decorate(
        [
          __param(0, Headers()),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "HEADERS:0": { type: ParamSource.HEADERS, key: undefined, index: 0 }
      });
    });
  });
  describe("@Request", () => {
    it("should define correct metadata for @Request with a key", () => {
      class TestController {
        testMethod(method) {}
      }

      __decorate(
        [
          __param(0, Request("method")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "REQUEST:0": { type: ParamSource.REQUEST, key: "method", index: 0 }
      });
    });
    it("should define correct metadata for @Request without a key (full request object)", () => {
      class TestController {
        testMethod(req) {}
      }

      __decorate(
        [
          __param(0, Request()),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "REQUEST:0": { type: ParamSource.REQUEST, key: undefined, index: 0 }
      });
    });
  });
  describe("@Response", () => {
    it("should define correct metadata for @Response with a key", () => {
      class TestController {
        testMethod(status) {}
      }

      __decorate(
        [
          __param(0, Response("status")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Number]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "RESPONSE:0": { type: ParamSource.RESPONSE, key: "status", index: 0 }
      });
    });
    it("should define correct metadata for @Response without a key (full response object)", () => {
      class TestController {
        testMethod(res) {}
      }

      __decorate(
        [
          __param(0, Response()),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "RESPONSE:0": { type: ParamSource.RESPONSE, key: undefined, index: 0 }
      });
    });
  });
  describe("Multiple Parameters and Methods", () => {
    it("should define correct metadata for multiple parameters in the same method", () => {
      class TestController {
        testMethod(id, search, body, event, accept, req, ok) {}
      }

      __decorate(
        [
          __param(0, Param("userId")),
          __param(1, Query("search")),
          __param(2, Body()),
          __param(3, Event()),
          __param(4, Headers("Accept")),
          __param(5, Request()),
          __param(6, Response("ok")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [
            String,
            String,
            Object,
            Object,
            String,
            Object,
            Boolean
          ]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
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
        methodOne(id) {}

        methodTwo(page) {}
      }

      __decorate(
        [
          __param(0, Param("id")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "methodOne",
        null
      );
      __decorate(
        [
          __param(0, Query("page")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Number]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "methodTwo",
        null
      );
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
        methodA(alpha) {}

        methodB(beta) {}
      }

      __decorate(
        [
          __param(0, Param("alpha")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "methodA",
        null
      );
      __decorate(
        [
          __param(0, Query("beta")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [String]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "methodB",
        null
      );
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
        someMethod(arg1, arg2) {}
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
        testMethod(param) {}
      }

      __decorate(
        [
          __param(0, Param(null)),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "PARAM:0": { type: ParamSource.PARAM, key: null, index: 0 }
      });
    });
    it("should store empty string as key if provided", () => {
      class TestController {
        testMethod(query) {}
      }

      __decorate(
        [
          __param(0, Query("")),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "QUERY:0": { type: ParamSource.QUERY, key: "", index: 0 }
      });
    });
    it("should store number as key if provided (TS warning, but JS allows)", () => {
      class TestController {
        testMethod(body) {}
      }

      __decorate(
        [
          __param(0, Body(123)),
          __metadata("design:type", Function),
          __metadata("design:paramtypes", [Object]),
          __metadata("design:returntype", void 0)
        ],
        TestController.prototype,
        "testMethod",
        null
      );
      const metadata = getParameterMetadata(TestController, "testMethod");
      expect(metadata).toEqual({
        "BODY:0": { type: ParamSource.BODY, key: 123, index: 0 }
      });
    });
  });
});
