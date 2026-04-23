import "reflect-metadata";
import { describe, expect, it } from "vitest";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK
} from "src/domain/constants";
import { SheetController, SheetsController } from "src/controller/decorators";

describe("SheetController Decorator: Positive", () => {
  it("should define correct metadata with sheetName (string)", () => {
    @SheetController("Sheet1")
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestController)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("sheets");
    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestController)).toEqual({
      sheetName: "Sheet1"
    });
  });

  it("should define correct metadata with sheetName (RegExp)", () => {
    const regex = /Sheet\d+/;
    @SheetsController(regex)
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("sheets");
    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestController)).toEqual({
      sheetName: regex
    });
  });

  it("should define correct metadata without sheetName", () => {
    @SheetController()
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("sheets");
    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestController)).toEqual({
      sheetName: undefined
    });
  });
});
