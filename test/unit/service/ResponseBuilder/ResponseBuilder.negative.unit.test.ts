import { describe, expect, it } from "vitest";
import { ResponseBuilder } from "src/service";
import { HttpStatus, RequestMethod } from "src/domain/enums";
import { HttpRequest } from "src/domain/types";

describe("ResponseBuilder: Negative", () => {
  const builder = new ResponseBuilder();
  const mockRequest = {
    method: RequestMethod.GET,
    headers: {},
    url: { pathname: "/" }
  } as unknown as HttpRequest;

  it("should handle unknown status codes gracefully", () => {
    const res = builder.create(mockRequest, 999 as unknown as HttpStatus);
    expect(res.statusText).toBe("UNKNOWN_STATUS");
    expect(res.status).toBe(999);
  });
});
