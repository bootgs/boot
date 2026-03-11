import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { ENTITY_WATERMARK } from "src/domain/constants";

describe("@Entity: Negative", () => {
  it("should not define watermark if decorator is not applied", () => {
    class TestClass {}
    expect(Reflect.getMetadata(ENTITY_WATERMARK, TestClass)).toBeUndefined();
  });
});
