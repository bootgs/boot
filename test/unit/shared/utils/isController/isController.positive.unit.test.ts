import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { isController } from "src/shared/utils";
import { HttpController } from "src/controller/decorators";

describe("isController: Positive", () => {
  it("should return true for a class decorated with @HttpController", () => {
    @HttpController()
    class TestController {}
    expect(isController(TestController)).toBe(true);
  });
});
