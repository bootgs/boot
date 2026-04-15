import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResponseBuilder } from "src/service";
import { ContentMimeType, RequestMethod } from "src/domain/enums";
import { HttpRequest } from "src/domain/types";

describe("ResponseBuilder: MimeTypes", () => {
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
        TEXT: "TEXT",
        CSV: "CSV",
        ICAL: "ICAL",
        JAVASCRIPT: "JAVASCRIPT",
        VCARD: "VCARD",
        ATOM: "ATOM",
        RSS: "RSS",
        XML: "XML"
      }
    });
    vi.stubGlobal("HtmlService", {
      createHtmlOutput: vi.fn().mockReturnValue("html-output")
    });
  });

  const testMimeType = (produce: ContentMimeType, expectedMimeType: string) => {
    it(`should wrap as ${expectedMimeType} if produce is ${produce}`, () => {
      const res = builder.create(mockRequest, undefined, {}, { foo: "bar" }, produce);

      builder.wrap(mockRequest, res);
      expect(vi.mocked(global.ContentService).createTextOutput).toHaveBeenCalled();
      const mockOutput = vi.mocked(global.ContentService).createTextOutput.mock.results[0].value;
      expect(mockOutput.setMimeType).toHaveBeenCalledWith(expectedMimeType);
    });
  };

  testMimeType(ContentMimeType.JSON, "JSON");
  testMimeType(ContentMimeType.TEXT, "TEXT");
  testMimeType(ContentMimeType.CSV, "CSV");
  testMimeType(ContentMimeType.ICAL, "ICAL");
  testMimeType(ContentMimeType.JAVASCRIPT, "JAVASCRIPT");
  testMimeType(ContentMimeType.VCARD, "VCARD");
  testMimeType(ContentMimeType.ATOM, "ATOM");
  testMimeType(ContentMimeType.RSS, "RSS");
  testMimeType(ContentMimeType.XML, "XML");

  it("should wrap as HTML if no produce is specified", () => {
    const res = builder.create(mockRequest, undefined, {}, "hello");
    const result = builder.wrap(mockRequest, res);
    expect(vi.mocked(global.HtmlService).createHtmlOutput).toHaveBeenCalled();
    expect(result).toBe("html-output");
  });

  it('should return raw string if "X-Request-Source: internal" header is present', () => {
    const req = {
      ...mockRequest,
      headers: { "X-Request-Source": "internal" }
    } as unknown as HttpRequest;
    const res = builder.create(req, undefined, {}, { foo: "bar" }, ContentMimeType.JSON);
    const result = builder.wrap(req, res);

    expect(result).toBe(
      JSON.stringify({
        headers: { "Content-Type": "application/json" },
        ok: true,
        status: 200,
        statusText: "OK",
        body: { foo: "bar" },
        produce: "application/json",
        isResponseBody: false
      })
    );
    expect(vi.mocked(global.ContentService).createTextOutput).not.toHaveBeenCalled();
    expect(vi.mocked(global.HtmlService).createHtmlOutput).not.toHaveBeenCalled();
  });
});
