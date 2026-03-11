import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { isInjectable } from "src/shared/utils";

describe("isInjectable: Negative", () => {
  it("should return false for a class without decorator", () => {
    class NormalClass {}
    expect(isInjectable(NormalClass)).toBe(false);
  });
});
