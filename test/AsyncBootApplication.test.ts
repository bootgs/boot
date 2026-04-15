import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { AsyncBootApplication, Get, HttpController, ResponseBody } from "../src";

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

describe("AsyncBootApplication", () => {
  it("should handle async controller method and return Promise", async () => {
    @ResponseBody()
    @HttpController("/api")
    class TestController {
      @Get("/test")
      async handle() {
        return new Promise((resolve) => {
          setTimeout(() => resolve({ message: "hello" }), 10);
        });
      }
    }

    const app = new AsyncBootApplication({
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

    const result: any = await app.doGet(event);
    const content = JSON.parse(result.getContent());
    expect(content.message).toBe("hello");
  });

  it("should handle sync controller method and still return Promise (as it is async method)", async () => {
    @ResponseBody()
    @HttpController("/api")
    class TestController {
      @Get("/test")
      handle() {
        return { message: "sync" };
      }
    }

    const app = new AsyncBootApplication({
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

    const result: any = await app.doGet(event);
    const content = JSON.parse(result.getContent());
    expect(content.message).toBe("sync");
  });
});
