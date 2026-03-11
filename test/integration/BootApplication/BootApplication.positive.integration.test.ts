import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { Body, Param, Query } from "src/controller/decorators/params";
import { BootApplicationFactory } from "src/controller";
import { Get, Post } from "src/controller/decorators/routing";
import { HttpController } from "src/controller/decorators";

@HttpController("/users")
class UserController {
  @Get("/{id}")
  getUser(@Param("id") id: string, @Query("fields") fields: string) {
    return { id, fields, method: "GET" };
  }

  @Post("/")
  createUser(@Body() data: Record<string, unknown>) {
    return { ...data, method: "POST" };
  }
}

describe("Integration: BootApplication: Positive", () => {
  const app = BootApplicationFactory.create({
    controllers: [UserController]
  });

  // Mock ContentService and HtmlService
  (global as unknown as Record<string, unknown>).ContentService = {
    createTextOutput: vi.fn().mockReturnValue({
      setMimeType: vi.fn().mockReturnThis()
    }),
    MimeType: {
      JSON: "JSON",
      TEXT: "TEXT"
    }
  };

  (global as unknown as Record<string, unknown>).HtmlService = {
    createHtmlOutput: vi.fn().mockReturnValue({})
  };

  it("should handle GET request with path and query params", async () => {
    const event = {
      parameter: { fields: "name,email" },
      parameters: { fields: ["name,email"] },
      contextPath: "",
      contentLength: -1,
      queryString: "fields=name,email",
      pathInfo: "users/123"
    } as unknown as GoogleAppsScript.Events.DoGet;

    await app.doGet(event);

    expect(global.HtmlService.createHtmlOutput).toHaveBeenCalled();
    const callArgs = vi.mocked(global.HtmlService.createHtmlOutput).mock.calls[0][0];
    const responseBody = JSON.parse(callArgs as string);
    expect(responseBody).toEqual({ id: "123", fields: ["name,email"], method: "GET" });
  });

  it("should handle POST request with body", async () => {
    const data = { name: "John Doe" };
    const event = {
      postData: {
        contents: JSON.stringify(data),
        type: "application/json"
      },
      pathInfo: "users"
    } as unknown as GoogleAppsScript.Events.DoPost;

    await app.doPost(event);

    expect(global.HtmlService.createHtmlOutput).toHaveBeenCalled();
    const lastCall = vi.mocked(global.HtmlService.createHtmlOutput).mock.calls.length - 1;
    const callArgs = vi.mocked(global.HtmlService.createHtmlOutput).mock.calls[lastCall][0];
    const responseBody = JSON.parse(callArgs as string);
    expect(responseBody).toEqual({ name: "John Doe", method: "POST" });
  });
});
