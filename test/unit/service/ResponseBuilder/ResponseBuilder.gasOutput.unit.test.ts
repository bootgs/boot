import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResponseBuilder } from "src/service";
import { HttpStatus, RequestMethod } from "src/domain/enums";
import { HttpRequest } from "src/domain/types";
import * as appsScriptUtils from "apps-script-utils";

vi.mock("apps-script-utils", async () => {
  const actual = await vi.importActual("apps-script-utils");
  return {
    ...actual,
    isHtmlOutput: vi.fn(),
    isTextOutput: vi.fn()
  };
});

describe("ResponseBuilder: GasOutput", () => {
  const builder = new ResponseBuilder();
  const mockRequest = {
    method: RequestMethod.GET,
    headers: {},
    url: { pathname: "/" }
  } as unknown as HttpRequest;

  beforeEach(() => {
    vi.clearAllMocks();
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

    vi.mocked(appsScriptUtils.isHtmlOutput).mockImplementation(
      (val: any) => val && val.__isHtmlOutput
    );
    vi.mocked(appsScriptUtils.isTextOutput).mockImplementation(
      (val: any) => val && val.__isTextOutput
    );
  });

  it("should not wrap TextOutput in error object even if status is not 2xx", () => {
    const textOutput = {
      getContent: () => "content",
      getMimeType: () => {},
      __isTextOutput: true
    };
    const res = builder.create(mockRequest, HttpStatus.BAD_REQUEST, {}, textOutput);

    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    expect(res.ok).toBe(false);
    expect(res.body).toBe(textOutput);
  });

  it("should return TextOutput directly in wrap method", () => {
    const textOutput = {
      getContent: () => "content",
      getMimeType: () => {},
      __isTextOutput: true
    };
    const res = builder.create(mockRequest, HttpStatus.OK, {}, textOutput);
    const result = builder.wrap(mockRequest, res);

    expect(result).toBe(textOutput);
  });

  it("should return HtmlOutput directly in wrap method", () => {
    const htmlOutput = {
      getContent: () => "content",
      setTitle: () => {},
      setXFrameOptionsMode: () => {},
      __isHtmlOutput: true
    };
    const res = builder.create(mockRequest, HttpStatus.OK, {}, htmlOutput);
    const result = builder.wrap(mockRequest, res);

    expect(result).toBe(htmlOutput);
  });

  it("should return GasOutput even for API requests (should not be wrapped in JSON structure)", () => {
    const apiBuilder = new ResponseBuilder("api");
    const apiRequest = {
      method: RequestMethod.GET,
      headers: {},
      url: { pathname: "/api/feed" }
    } as unknown as HttpRequest;

    const textOutput = {
      getContent: () => "content",
      getMimeType: () => {},
      __isTextOutput: true
    };
    const res = apiBuilder.create(apiRequest, HttpStatus.OK, {}, textOutput);
    const result = apiBuilder.wrap(apiRequest, res);

    expect(result).toBe(textOutput);
  });
});
