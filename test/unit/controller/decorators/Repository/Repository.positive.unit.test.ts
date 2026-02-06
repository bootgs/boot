import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { INJECTABLE_WATERMARK } from "src/domain/constants";
import { Repository } from "src/controller/decorators";

describe("@Repository: Positive", () => {
  it("should define INJECTABLE_WATERMARK", () => {
    @Repository()
    class TestRepo {}

    expect(Reflect.getMetadata(INJECTABLE_WATERMARK, TestRepo)).toBe(true);
  });
});
