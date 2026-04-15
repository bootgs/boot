import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { BootApplication, Get, HttpController, ResponseBody } from "../src";

// Mock Google Apps Script services
global.HtmlService = {
  createHtmlOutput: vi.fn((content) => ({
    getContent: () => content,
    setMimeType: vi.fn().mockReturnThis(),
    setTitle: vi.fn().mockReturnThis(),
    setFaviconUrl: vi.fn().mockReturnThis()
  }))
} as any;

global.ContentService = {
  createTextOutput: vi.fn((content) => ({
    getContent: () => content,
    setMimeType: vi.fn().mockReturnThis()
  })),
  MimeType: { JSON: "JSON", TEXT: "TEXT" }
} as any;

describe("BootApplication", () => {
  it("should handle sync controller method and return result synchronously", () => {
    @ResponseBody()
    @HttpController("/api")
    class TestController {
      @Get("/test")
      handle() {
        return { message: "sync" };
      }
    }

    const app = new BootApplication({
      controllers: [TestController]
    });

    const event = {
      parameter: {},
      contextPath: "",
      contentLength: 0,
      queryString: "",
      parameters: {},
      pathInfo: "api/test"
    } as GoogleAppsScript.Events.DoGet;

    const result: any = app.doGet(event);
    expect(result).not.toBeInstanceOf(Promise);
    const content = JSON.parse(result.getContent());
    expect(content.message).toBe("sync");
  });

  it("should handle async controller method and return Promise synchronously (but it won't be resolved)", () => {
    @ResponseBody()
    @HttpController("/api")
    class TestController {
      @Get("/test")
      async handle() {
        return { message: "async" };
      }
    }

    const app = new BootApplication({
      controllers: [TestController]
    });

    const event = {
      parameter: {},
      contextPath: "",
      contentLength: 0,
      queryString: "",
      parameters: {},
      pathInfo: "api/test"
    } as GoogleAppsScript.Events.DoGet;

    const result = app.doGet(event);
    expect(result).toBeInstanceOf(Promise);
  });
});
