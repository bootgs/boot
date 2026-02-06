import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { isController } from "src/shared/utils";

describe("isController: Negative", () => {
  it("should return false for a class without decorator", () => {
    class NormalClass {}
    expect(isController(NormalClass)).toBe(false);
  });
});
