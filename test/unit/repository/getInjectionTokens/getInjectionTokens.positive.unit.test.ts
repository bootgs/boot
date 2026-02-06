import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { getInjectionTokens } from "src/repository";
import { INJECT_TOKENS_METADATA } from "src/domain/constants";
import { ParamSource } from "src/domain/enums";

describe("getInjectionTokens: positive", () => {
  it("should return injection tokens for a constructor", () => {
    class Test {}
    const tokens = {
      [ `${ParamSource.INJECT}:0` ]: { type: ParamSource.INJECT, token: "ServiceA", index: 0 }
    };
    Reflect.defineMetadata(INJECT_TOKENS_METADATA, tokens, Test);

    const result = getInjectionTokens(Test);
    expect(result).toEqual(tokens);
  });

  it("should return injection tokens for a method", () => {
    class Test {
      method() {}
    }
    const tokens = {
      [ `${ParamSource.INJECT}:0` ]: { type: ParamSource.INJECT, token: "ServiceB", index: 0 }
    };
    Reflect.defineMetadata(INJECT_TOKENS_METADATA, tokens, Test.prototype, "method");

    const result = getInjectionTokens(Test.prototype, "method");
    expect(result).toEqual(tokens);
  });
});
