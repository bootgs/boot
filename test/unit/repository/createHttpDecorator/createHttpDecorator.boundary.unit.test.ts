import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { createHttpDecorator } from "src/repository";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { RequestMethod } from "src/domain/enums";

describe("createHttpDecorator: boundary", () => {
  it("should use '/' as default path if none is provided", () => {
    const decorator = createHttpDecorator(RequestMethod.GET);
    const methodDecorator = decorator();

    class Test {
      method() {}
    }

    const descriptor = Object.getOwnPropertyDescriptor(Test.prototype, "method")!;
    methodDecorator(Test.prototype, "method", descriptor);

    expect(Reflect.getMetadata(PATH_METADATA, Test.prototype.method)).toBe("/");
  });

  it("should fallback to GET if method is falsy", () => {
    const decorator = createHttpDecorator(null as unknown as RequestMethod);
    const methodDecorator = decorator();

    class Test {
      method() {}
    }

    const descriptor = Object.getOwnPropertyDescriptor(Test.prototype, "method")!;
    methodDecorator(Test.prototype, "method", descriptor);

    expect(Reflect.getMetadata(METHOD_METADATA, Test.prototype.method)).toBe(RequestMethod.GET);
  });
});
