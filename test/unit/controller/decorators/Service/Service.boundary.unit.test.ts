import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { INJECTABLE_WATERMARK } from "src/domain/constants";
import { Service } from "src/controller/decorators";

describe("@Service: Boundary", () => {
  it("should handle multiple @Service decorators", () => {
    @Service()
    @Service()
    class TestClass {}

    expect(Reflect.getMetadata(INJECTABLE_WATERMARK, TestClass)).toBe(true);
  });
});
