import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResponseBuilder } from "src/service";
import { HeaderAcceptMimeType, HttpStatus, RequestMethod } from "src/domain/enums";
import { HttpRequest } from "src/domain/types";

describe("ResponseBuilder: Positive", () => {
  const builder = new ResponseBuilder();
  const mockRequest = {
    method: RequestMethod.GET,
    headers: {},
    url: { pathname: "/" }
  } as unknown as HttpRequest;

  beforeEach(() => {
    vi.stubGlobal("ContentService", {
      createTextOutput: vi.fn().mockReturnValue({
        setMimeType: vi.fn().mockReturnThis()
      }),
      MimeType: {
        JSON: "JSON",
        TEXT: "TEXT"
      }
    });
    vi.stubGlobal("HtmlService", {
      createHtmlOutput: vi.fn().mockReturnValue("html-output")
    });
  });

  describe("create", () => {
    it("should create a successful response with default status OK for GET", () => {
      const data = { message: "ok" };
      const res = builder.create(mockRequest, undefined, {}, data);

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.ok).toBe(true);
      expect(res.body).toEqual(data);
    });

    it("should create a successful response with default status CREATED for POST", () => {
      const postRequest = { ...mockRequest, method: RequestMethod.POST } as HttpRequest;
      const res = builder.create(postRequest, undefined, {}, { id: 1 });

      expect(res.status).toBe(HttpStatus.CREATED);
    });

    it("should handle error status and wrap body in error object", () => {
      const res = builder.create(mockRequest, HttpStatus.BAD_REQUEST, {}, "invalid");
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.ok).toBe(false);
      expect(res.body).toEqual({ error: "invalid" });
    });
  });

  describe("wrap", () => {
    it("should wrap as JSON if Accept header is application/json", () => {
      const req = { ...mockRequest, headers: { Accept: HeaderAcceptMimeType.JSON } } as HttpRequest;
      const res = builder.create(req, HttpStatus.OK, {}, { foo: "bar" });

      builder.wrap(req, res);
      expect(vi.mocked(global.ContentService).createTextOutput).toHaveBeenCalled();
    });

    it("should wrap as HTML by default", () => {
      const res = builder.create(mockRequest, HttpStatus.OK, {}, "hello");
      const result = builder.wrap(mockRequest, res);
      expect(vi.mocked(global.HtmlService).createHtmlOutput).toHaveBeenCalled();
      expect(result).toBe("html-output");
    });
  });
});
