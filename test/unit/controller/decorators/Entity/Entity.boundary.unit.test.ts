import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { ENTITY_WATERMARK } from "src/domain/constants";
import { Entity } from "src/controller/decorators";

describe("@Entity: Boundary", () => {
  it("should handle multiple @Entity decorators", () => {
    @Entity()
    @Entity()
    class TestClass {}

    expect(Reflect.getMetadata(ENTITY_WATERMARK, TestClass)).toBe(true);
  });
});
