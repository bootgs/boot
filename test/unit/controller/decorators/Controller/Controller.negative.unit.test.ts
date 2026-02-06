import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { CONTROLLER_WATERMARK } from "src/domain/constants";

describe("@Controller: Negative", () => {
  it("should not define metadata if decorator is not applied", () => {
    class TestClass {}
    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestClass)).toBeUndefined();
  });
});
