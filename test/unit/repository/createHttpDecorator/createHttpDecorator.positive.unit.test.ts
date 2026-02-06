import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { createHttpDecorator } from "src/repository";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { RequestMethod } from "src/domain/enums";

describe("createHttpDecorator: positive", () => {
  it("should define correct method and path metadata", () => {
    const method = RequestMethod.POST;
    const path = "/users";
    const decorator = createHttpDecorator(method);
    const methodDecorator = decorator(path);

    class Test {
      method() {}
    }

    const descriptor = Object.getOwnPropertyDescriptor(Test.prototype, "method")!;
    methodDecorator(Test.prototype, "method", descriptor);

    expect(Reflect.getMetadata(METHOD_METADATA, Test.prototype.method)).toBe(method);
    expect(Reflect.getMetadata(PATH_METADATA, Test.prototype.method)).toBe(path);
  });
});
