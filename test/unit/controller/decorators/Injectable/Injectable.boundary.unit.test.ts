import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { INJECTABLE_WATERMARK } from "src/domain/constants";
import { Injectable } from "src/controller/decorators";

describe("@Injectable: Boundary", () => {
  it("should handle multiple @Injectable decorators", () => {
    @Injectable()
    @Injectable()
    class TestClass {}

    expect(Reflect.getMetadata(INJECTABLE_WATERMARK, TestClass)).toBe(true);
  });
});
