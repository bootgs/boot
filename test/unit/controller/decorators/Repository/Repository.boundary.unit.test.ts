import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { INJECTABLE_WATERMARK } from "src/domain/constants";
import { Repository } from "src/controller/decorators";

describe("@Repository: Boundary", () => {
  it("should handle multiple @Repository decorators", () => {
    @Repository()
    @Repository()
    class TestClass {}

    expect(Reflect.getMetadata(INJECTABLE_WATERMARK, TestClass)).toBe(true);
  });
});
