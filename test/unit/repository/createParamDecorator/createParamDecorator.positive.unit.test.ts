import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { createParamDecorator } from "src/repository";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { ParamSource } from "src/domain/enums";

describe("createParamDecorator: positive", () => {
  it("should define parameter metadata for a method", () => {
    const type = ParamSource.QUERY;
    const key = "id";
    const decorator = createParamDecorator(type);
    const paramDecorator = decorator(key);

    class Test {
      method(@paramDecorator _param: string) {}
    }

    const metadata = Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, Test.prototype, "method");
    expect(metadata).toEqual({
      [`${type}:0`]: { type, key, index: 0 }
    });
  });

  it("should define parameter metadata for a constructor", () => {
    const type = ParamSource.INJECT;
    const key = "service";
    const decorator = createParamDecorator(type);
    const paramDecorator = decorator(key);

    class Test {
      constructor(@paramDecorator __param: unknown) {}
    }

    const metadata = Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, Test);
    expect(metadata).toEqual({
      [`${type}:0`]: { type, key, index: 0 }
    });
  });
});
