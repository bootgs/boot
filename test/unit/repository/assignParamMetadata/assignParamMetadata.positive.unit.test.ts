import { describe, expect, it } from "vitest";
import { assignParamMetadata } from "src/repository";
import { ParamSource } from "src/domain/enums";

describe("assignParamMetadata: Positive", () => {
  it("should correctly update existing metadata object", () => {
    const existing = {
      "QUERY:0": { type: ParamSource.QUERY, key: "name", index: 0 }
    };
    const updated = assignParamMetadata(existing, 1, ParamSource.BODY, "data");

    expect(updated).toEqual({
      "QUERY:0": { type: ParamSource.QUERY, key: "name", index: 0 },
      "BODY:1": { type: ParamSource.BODY, key: "data", index: 1 }
    });
  });
});
