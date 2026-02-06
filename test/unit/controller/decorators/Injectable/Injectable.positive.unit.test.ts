import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { INJECTABLE_WATERMARK } from "src/domain/constants";
import { Injectable } from "src/controller/decorators";

describe("@Injectable: Positive", () => {
  it("should define INJECTABLE_WATERMARK", () => {
    @Injectable()
    class TestService {}

    expect(Reflect.getMetadata(INJECTABLE_WATERMARK, TestService)).toBe(true);
  });
});
