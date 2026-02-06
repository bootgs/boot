import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResponseBuilder } from "src/service";
import { HeaderAcceptMimeType, HttpStatus, RequestMethod } from "src/domain/enums";
import { HttpRequest } from "src/domain/types";

describe("ResponseBuilder: Extra", () => {
  let builder: ResponseBuilder;

  beforeEach(() => {
    builder = new ResponseBuilder();
    (global as unknown as Record<string, unknown>).ContentService = {
      createTextOutput: vi.fn().mockReturnValue({
        setMimeType: vi.fn().mockReturnThis()
      }),
      MimeType: { JSON: "JSON", TEXT: "TEXT" }
    };
    (global as unknown as Record<string, unknown>).HtmlService = {
      createHtmlOutput: vi.fn().mockReturnValue("HTML_OUTPUT")
    };
  });

  it("should return string for GOOGLE_JSON and GOOGLE_TEXT", () => {
    const response = { headers: {}, body: { foo: "bar" }, status: 200, ok: true, statusText: "OK" };

    const reqJson = {
      method: RequestMethod.GET,
      headers: { Accept: HeaderAcceptMimeType.GOOGLE_JSON },
      url: {}
    } as unknown as HttpRequest;
    expect(builder.wrap(reqJson, response)).toBe(JSON.stringify(response.body));

    const reqText = {
      method: RequestMethod.GET,
      headers: { Accept: HeaderAcceptMimeType.GOOGLE_TEXT },
      url: {}
    } as unknown as HttpRequest;
    expect(builder.wrap(reqText, response)).toBe(JSON.stringify(response.body));
  });

  it("should use ContentService for TEXT mime type", () => {
    const response = { headers: {}, body: "plain text", status: 200, ok: true, statusText: "OK" };
    const request = {
      method: RequestMethod.GET,
      headers: { Accept: HeaderAcceptMimeType.TEXT },
      url: {}
    } as unknown as HttpRequest;

    builder.wrap(request, response);
    expect(vi.mocked(global.ContentService).createTextOutput).toHaveBeenCalledWith(
      JSON.stringify(response.body)
    );
  });

  it("should use HtmlService as default", () => {
    const response = { headers: {}, body: "some body", status: 200, ok: true, statusText: "OK" };
    const request = {
      method: RequestMethod.GET,
      headers: { Accept: "unknown/type" },
      url: {}
    } as unknown as HttpRequest;

    const result = builder.wrap(request, response);
    expect(vi.mocked(global.HtmlService).createHtmlOutput).toHaveBeenCalled();
    expect(result).toBe("HTML_OUTPUT");
  });

  it("should handle unknown status code in create", () => {
    const request = { method: RequestMethod.GET } as unknown as HttpRequest;
    const response = builder.create(request, 999 as unknown as HttpStatus);
    expect(response.statusText).toBe("UNKNOWN_STATUS");
  });
});
