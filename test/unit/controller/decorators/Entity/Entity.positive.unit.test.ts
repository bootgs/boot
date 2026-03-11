import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { ENTITY_WATERMARK } from "src/domain/constants";
import { Entity } from "src/controller/decorators";

describe("@Entity: Positive", () => {
  it("should define ENTITY_WATERMARK", () => {
    @Entity()
    class TestEntity {}

    expect(Reflect.getMetadata(ENTITY_WATERMARK, TestEntity)).toBe(true);
  });
});
