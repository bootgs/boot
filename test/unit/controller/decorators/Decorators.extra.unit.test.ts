import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Param } from "src/controller/decorators/params";
import { Inject } from "src/controller/decorators";
import { createHttpDecorator } from "src/repository";
import {
  INJECT_TOKENS_METADATA,
  METHOD_METADATA,
  PARAM_DEFINITIONS_METADATA
} from "src/domain/constants";
import { RequestMethod } from "src/domain/enums";

describe("Decorators: Extra Coverage", () => {
  it("should cover Inject in methods and constructors", () => {
    class Test {
      constructor(@Inject("BASE") _base: unknown) {}
      method(@Inject("METHOD") _m: unknown) {}
    }

    const ctorMeta = Reflect.getMetadata(INJECT_TOKENS_METADATA, Test);
    expect(ctorMeta).toBeDefined();

    const methodMeta = Reflect.getMetadata(INJECT_TOKENS_METADATA, Test.prototype, "method");
    expect(methodMeta).toBeDefined();
  });

  it("should cover Param in methods and constructors", () => {
    class Test {
      constructor(@Param("id") __id: string) {}
      method(@Param("name") __name: string) {}
    }

    const ctorMeta = Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, Test);
    expect(ctorMeta).toBeDefined();

    const methodMeta = Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, Test.prototype, "method");
    expect(methodMeta).toBeDefined();
  });

  it("should cover createHttpDecorator default method", () => {
    const CustomGet = createHttpDecorator(undefined as unknown as RequestMethod);
    class Test {
      @CustomGet("/")
      method() {}
    }

    const method = Test.prototype.method;
    expect(Reflect.getMetadata(METHOD_METADATA, method)).toBe(RequestMethod.GET);
  });
});
