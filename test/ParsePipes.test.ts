import "reflect-metadata";
import { describe, expect, it } from "vitest";
import {
  ParseBigIntPipe,
  ParseBooleanPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseNumberPipe,
  ParseStringPipe
} from "../src/controller/decorators/params/pipes";
import { ParamSource } from "../src/domain/enums";

describe("ParsePipes", () => {
  const metadata = { type: ParamSource.QUERY, data: "test" };

  describe("ParseNumberPipe", () => {
    const pipe = new ParseNumberPipe();

    it("should parse a numeric string", () => {
      expect(pipe.transform("123", metadata)).toBe(123);
      expect(pipe.transform("123.45", metadata)).toBe(123.45);
    });

    it("should return the value if it is already a number", () => {
      expect(pipe.transform(123, metadata)).toBe(123);
    });

    it("should throw an error for non-numeric strings", () => {
      expect(() => pipe.transform("abc", metadata)).toThrow();
    });
  });

  describe("ParseIntPipe", () => {
    const pipe = new ParseIntPipe();

    it("should parse an integer string", () => {
      expect(pipe.transform("123", metadata)).toBe(123);
    });

    it("should parse a float string as integer", () => {
      expect(pipe.transform("123.75", metadata)).toBe(123);
    });

    it("should throw an error for non-numeric strings", () => {
      expect(() => pipe.transform("abc", metadata)).toThrow();
    });
  });

  describe("ParseFloatPipe", () => {
    const pipe = new ParseFloatPipe();

    it("should parse a float string", () => {
      expect(pipe.transform("123.45", metadata)).toBe(123.45);
    });

    it("should throw an error for non-numeric strings", () => {
      expect(() => pipe.transform("abc", metadata)).toThrow();
    });
  });

  describe("ParseBooleanPipe", () => {
    const pipe = new ParseBooleanPipe();

    it("should parse boolean strings", () => {
      expect(pipe.transform("true", metadata)).toBe(true);
      expect(pipe.transform("false", metadata)).toBe(false);
      expect(pipe.transform("1", metadata)).toBe(true);
      expect(pipe.transform("0", metadata)).toBe(false);
    });

    it("should parse boolean values", () => {
      expect(pipe.transform(true, metadata)).toBe(true);
      expect(pipe.transform(false, metadata)).toBe(false);
    });

    it("should parse null/undefined as false", () => {
      expect(pipe.transform(null as any, metadata)).toBe(false);
      expect(pipe.transform(undefined as any, metadata)).toBe(false);
    });

    it("should throw an error for invalid boolean strings", () => {
      expect(() => pipe.transform("notaboolean", metadata)).toThrow();
    });
  });

  describe("ParseStringPipe", () => {
    const pipe = new ParseStringPipe();

    it("should return a string for various inputs", () => {
      expect(pipe.transform("hello", metadata)).toBe("hello");
      expect(pipe.transform(123, metadata)).toBe("123");
      expect(pipe.transform(true, metadata)).toBe("true");
    });

    it("should return empty string for null/undefined", () => {
      expect(pipe.transform(null, metadata)).toBe("");
      expect(pipe.transform(undefined, metadata)).toBe("");
    });
  });

  describe("ParseBigIntPipe", () => {
    const pipe = new ParseBigIntPipe();

    it("should parse bigint strings", () => {
      expect(pipe.transform("123", metadata)).toBe(BigInt(123));
    });

    it("should parse numbers as bigint", () => {
      expect(pipe.transform(123, metadata)).toBe(BigInt(123));
    });

    it("should throw an error for invalid bigint strings", () => {
      expect(() => pipe.transform("abc", metadata)).toThrow();
      expect(() => pipe.transform("123.45", metadata)).toThrow();
    });
  });
});
