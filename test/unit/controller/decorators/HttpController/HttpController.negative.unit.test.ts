import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { CONTROLLER_OPTIONS_METADATA, CONTROLLER_TYPE_METADATA, CONTROLLER_WATERMARK } from "src/domain/constants";

describe("HttpController Decorator: Negative", () => {
  it("should not define any metadata if HttpController is not applied", () => {
    class NonDecoratedController {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, NonDecoratedController)).toBeUndefined();
    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, NonDecoratedController)).toBeUndefined();
    expect(
      Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, NonDecoratedController)
    ).toBeUndefined();
  });
});
