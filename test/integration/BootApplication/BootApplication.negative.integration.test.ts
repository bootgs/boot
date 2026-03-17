import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import { BootApplicationFactory } from "src/controller";
import { Get } from "src/controller/decorators/routing";
import { HttpController } from "src/controller/decorators";

@HttpController("/users")
class UserController {
  @Get("/")
  getAll() {
    return [];
  }
}

describe("Integration: BootApplication: Negative", () => {
  const app = BootApplicationFactory.create({
    controllers: [ UserController ]
  });

  (global as unknown as Record<string, unknown>).HtmlService = {
    createHtmlOutput: vi.fn().mockReturnValue({})
  };

  it("should return 404 for unknown route", async () => {
    const event = {
      pathInfo: "unknown",
      parameter: {},
      parameters: {}
    } as unknown as GoogleAppsScript.Events.DoGet;

    await app.doGet(event);

    expect(global.HtmlService.createHtmlOutput).toHaveBeenCalled();
    const callArgs = vi.mocked(global.HtmlService.createHtmlOutput).mock.calls[ 0 ][ 0 ];
    const responseBody = JSON.parse(callArgs as string);
    expect(responseBody).toEqual({ error: { message: "Cannot get /unknown" } });
  });
});
