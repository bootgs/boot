import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { INJECTABLE_WATERMARK } from "src/domain/constants";

describe("@Repository: Negative", () => {
  it("should not define watermark if decorator is not applied", () => {
    class TestClass {}
    expect(Reflect.getMetadata(INJECTABLE_WATERMARK, TestClass)).toBeUndefined();
  });
});
