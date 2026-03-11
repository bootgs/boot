import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { createParamDecorator } from "src/repository";
import { PARAM_DEFINITIONS_METADATA } from "src/domain/constants";
import { ParamSource } from "src/domain/enums";

describe("createParamDecorator: boundary", () => {
  it("should handle multiple parameters on the same method", () => {
    const queryDecorator = createParamDecorator(ParamSource.QUERY);
    const bodyDecorator = createParamDecorator(ParamSource.BODY);

    class Test {
      method(@queryDecorator("id") _id: string, @bodyDecorator() _body: unknown) {}
    }

    const metadata = Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, Test.prototype, "method");
    expect(metadata).toEqual({
      [`${ParamSource.QUERY}:0`]: { type: ParamSource.QUERY, key: "id", index: 0 },
      [`${ParamSource.BODY}:1`]: { type: ParamSource.BODY, key: undefined, index: 1 }
    });
  });

  it("should handle parameters without a key", () => {
    const decorator = createParamDecorator(ParamSource.HEADERS);
    const headersDecorator = decorator();

    class Test {
      method(@headersDecorator _headers: unknown) {}
    }

    const metadata = Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, Test.prototype, "method");
    expect(metadata).toEqual({
      [`${ParamSource.HEADERS}:0`]: { type: ParamSource.HEADERS, key: undefined, index: 0 }
    });
  });
});
