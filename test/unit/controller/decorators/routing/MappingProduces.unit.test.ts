import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { GetMapping, PostMapping, RequestMapping } from "src/controller/decorators/routing";
import { ContentMimeType, RequestMethod } from "src/domain/enums";
import { METHOD_METADATA, PATH_METADATA, PRODUCE_METADATA } from "src/domain/constants";

describe("Routing Decorators with Produces", () => {
  describe("@RequestMapping", () => {
    it("should set produce metadata from produces option", () => {
      class TestController {
        @RequestMapping({ path: "/test", produces: ContentMimeType.JSON })
        testMethod() {}
      }

      const produce = Reflect.getMetadata(PRODUCE_METADATA, TestController.prototype.testMethod);
      const path = Reflect.getMetadata(PATH_METADATA, TestController.prototype.testMethod);

      expect(produce).toBe(ContentMimeType.JSON);
      expect(path).toBe("/test");
    });

    it("should handle array of produces (take first)", () => {
      class TestController {
        @RequestMapping({
          path: "/test",
          produces: [ContentMimeType.JSON, ContentMimeType.XML]
        })
        testMethod() {}
      }

      const produce = Reflect.getMetadata(PRODUCE_METADATA, TestController.prototype.testMethod);
      expect(produce).toBe(ContentMimeType.JSON);
    });
  });

  describe("@GetMapping", () => {
    it("should set produce metadata from produces option", () => {
      class TestController {
        @GetMapping({ path: "/get", produces: ContentMimeType.XML })
        testMethod() {}
      }

      const produce = Reflect.getMetadata(PRODUCE_METADATA, TestController.prototype.testMethod);
      const path = Reflect.getMetadata(PATH_METADATA, TestController.prototype.testMethod);
      const method = Reflect.getMetadata(METHOD_METADATA, TestController.prototype.testMethod);

      expect(produce).toBe(ContentMimeType.XML);
      expect(path).toBe("/get");
      expect(method).toBe(RequestMethod.GET);
    });

    it("should still work with string path", () => {
      class TestController {
        @GetMapping("/simple")
        testMethod() {}
      }

      const path = Reflect.getMetadata(PATH_METADATA, TestController.prototype.testMethod);
      expect(path).toBe("/simple");
    });
  });

  describe("@PostMapping", () => {
    it("should set produce metadata from produces option", () => {
      class TestController {
        @PostMapping({ value: "/post", produces: ContentMimeType.JSON })
        testMethod() {}
      }

      const produce = Reflect.getMetadata(PRODUCE_METADATA, TestController.prototype.testMethod);
      const path = Reflect.getMetadata(PATH_METADATA, TestController.prototype.testMethod);
      const method = Reflect.getMetadata(METHOD_METADATA, TestController.prototype.testMethod);

      expect(produce).toBe(ContentMimeType.JSON);
      expect(path).toBe("/post");
      expect(method).toBe(RequestMethod.POST);
    });
  });
});
