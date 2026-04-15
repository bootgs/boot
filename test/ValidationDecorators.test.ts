import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Max, Min } from "../src/controller/decorators/validation";
import { PARAM_DEFINITIONS_METADATA } from "../src/domain/constants";
import { Query } from "../src/controller/decorators/params";
import { MinPipe } from "../src/controller/decorators/validation/pipes/MinPipe";
import { MaxPipe } from "../src/controller/decorators/validation/pipes/MaxPipe";
import { SizePipe } from "../src/controller/decorators/validation/pipes/SizePipe";
import { PatternPipe } from "../src/controller/decorators/validation/pipes/PatternPipe";
import { NotEmptyPipe } from "../src/controller/decorators/validation/pipes/NotEmptyPipe";
import { NotBlankPipe } from "../src/controller/decorators/validation/pipes/NotBlankPipe";
import { EmailPipe } from "../src/controller/decorators/validation/pipes/EmailPipe";
import { PositivePipe } from "../src/controller/decorators/validation/pipes/PositivePipe";
import { AssertTruePipe } from "../src/controller/decorators/validation/pipes/AssertTruePipe";

describe("Validation Decorators", () => {
  it("should add validation pipes to metadata (Min/Max)", () => {
    class TestController {
       
      method(@Query("id") @Min(1) @Max(10) id: number) {}
    }

    const metadata = Reflect.getMetadata(
      PARAM_DEFINITIONS_METADATA,
      TestController.prototype,
      "method"
    );
    const paramDef = metadata["QUERY:0"];

    expect(paramDef).toBeDefined();
    expect(paramDef.pipes).toHaveLength(2);
    expect(paramDef.pipes[0]).toBeInstanceOf(MaxPipe);
    expect(paramDef.pipes[1]).toBeInstanceOf(MinPipe);
  });

  describe("Pipes", () => {
    const metadata = { type: 1, metatype: Number, data: "test" } as any;

    it("MinPipe", () => {
      const pipe = new MinPipe(10);
      expect(pipe.transform(10, metadata)).toBe(10);
      expect(pipe.transform(15, metadata)).toBe(15);
      expect(() => pipe.transform(5, metadata)).toThrow(/must be at least 10/);
    });

    it("MaxPipe", () => {
      const pipe = new MaxPipe(10);
      expect(pipe.transform(10, metadata)).toBe(10);
      expect(pipe.transform(5, metadata)).toBe(5);
      expect(() => pipe.transform(15, metadata)).toThrow(/must be at most 10/);
    });

    it("SizePipe", () => {
      const pipe = new SizePipe({ min: 2, max: 5 });
      expect(pipe.transform("abc", metadata)).toBe("abc");
      expect(pipe.transform([1, 2], metadata)).toEqual([1, 2]);
      expect(() => pipe.transform("a", metadata)).toThrow(/size must be between 2 and 5/);
      expect(() => pipe.transform("abcdef", metadata)).toThrow(/size must be between 2 and 5/);
    });

    it("PatternPipe", () => {
      const pipe = new PatternPipe(/^[0-9]+$/);
      expect(pipe.transform("123", metadata)).toBe("123");
      expect(() => pipe.transform("abc", metadata)).toThrow(/value must match pattern/);
    });

    it("NotEmptyPipe", () => {
      const pipe = new NotEmptyPipe();
      expect(pipe.transform("a", metadata)).toBe("a");
      expect(pipe.transform([1], metadata)).toEqual([1]);
      expect(() => pipe.transform("", metadata)).toThrow(/must not be empty/);
      expect(() => pipe.transform([], metadata)).toThrow(/must not be empty/);
      expect(() => pipe.transform(null, metadata)).toThrow(/must not be empty/);
    });

    it("NotBlankPipe", () => {
      const pipe = new NotBlankPipe();
      expect(pipe.transform("a", metadata)).toBe("a");
      expect(() => pipe.transform(" ", metadata)).toThrow(/must not be blank/);
      expect(() => pipe.transform("", metadata)).toThrow(/must not be blank/);
    });

    it("EmailPipe", () => {
      const pipe = new EmailPipe();
      expect(pipe.transform("test@example.com", metadata)).toBe("test@example.com");
      expect(() => pipe.transform("invalid", metadata)).toThrow(/valid email address/);
    });

    it("PositivePipe", () => {
      const pipe = new PositivePipe();
      expect(pipe.transform(1, metadata)).toBe(1);
      expect(() => pipe.transform(0, metadata)).toThrow(/must be positive/);
      expect(() => pipe.transform(-1, metadata)).toThrow(/must be positive/);
    });

    it("AssertTruePipe", () => {
      const pipe = new AssertTruePipe();
      expect(pipe.transform(true, metadata)).toBe(true);
      expect(() => pipe.transform(false, metadata)).toThrow(/must be true/);
    });
  });
});
