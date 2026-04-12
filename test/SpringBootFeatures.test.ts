import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import {
  Autowired,
  BootApplication,
  ControllerAdvice,
  ExceptionHandler,
  GetMapping,
  Injectable,
  RequestMapping,
  RequestMethod,
  ResponseStatus,
  RestController,
  Value
} from "../src";

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

@Injectable()
class ConfigService {
  constructor(@Value("app.name") public name: string) {}
}

@ControllerAdvice()
class GlobalExceptionHandler {
  @ExceptionHandler(Error)
  handleError(err: Error) {
    return { message: "Handled globally: " + err.message };
  }
}

@RequestMapping("/api/test")
@RestController()
class TestController {
  constructor(@Autowired(ConfigService) public configService: ConfigService) {}

  @GetMapping("/hello")
  @ResponseStatus(201)
  hello(@Value("greeting") greeting: string) {
    return { message: greeting + " from " + this.configService.name };
  }

  @RequestMapping({ path: "/multi", method: [RequestMethod.GET, RequestMethod.POST] })
  multi() {
    return { message: "multi" };
  }

  @GetMapping("/error")
  throwError() {
    throw new Error("Test error");
  }

  @GetMapping("/local-error")
  throwLocalError() {
    throw new TypeError("Local error");
  }

  @ExceptionHandler(TypeError)
  handleLocalError(err: TypeError) {
    return { message: "Handled locally: " + err.message };
  }
}

describe("Spring Boot Features", () => {
  const app = new BootApplication({
    controllers: [TestController],
    providers: [ConfigService, GlobalExceptionHandler],
    config: {
      app: {
        name: "SpringApp"
      },
      greeting: "Hello",
      apiPrefix: "api"
    }
  });

  it("should inject configuration via @Value in constructor", () => {
    const controller = (app as any)._resolver.resolve(TestController);
    expect(controller.configService.name).toBe("SpringApp");
  });

  it("should inject configuration via @Value in method", async () => {
    const event: any = {
      parameter: {
        path: "/api/test/hello",
        headers: JSON.stringify({ Accept: "application/json" })
      },
      parameters: {},
      pathInfo: "/api/test/hello",
      queryString: ""
    };

    const response: any = await app.doGet(event);
    const rawContent = response.getContent();
    const content = JSON.parse(rawContent);
    expect(content.body.message).toBe("Hello from SpringApp");
  });

  it("should handle multiple methods in @RequestMapping", async () => {
    const eventGet: any = {
      parameter: {
        path: "/api/test/multi",
        headers: JSON.stringify({ Accept: "application/json" })
      },
      parameters: {},
      pathInfo: "/api/test/multi",
      queryString: ""
    };

    const responseGet: any = await app.doGet(eventGet);
    expect(JSON.parse(responseGet.getContent()).body.message).toBe("multi");

    const eventPost: any = {
      parameter: {
        path: "/api/test/multi",
        headers: JSON.stringify({ Accept: "application/json" })
      },
      parameters: {},
      pathInfo: "/api/test/multi",
      queryString: "",
      postData: { contents: "{}", type: "application/json" }
    };

    const responsePost: any = await app.doPost(eventPost);
    expect(JSON.parse(responsePost.getContent()).body.message).toBe("multi");
  });

  it("should handle exceptions locally via @ExceptionHandler", async () => {
    const event: any = {
      parameter: {
        path: "/api/test/local-error",
        headers: JSON.stringify({ Accept: "application/json" })
      },
      parameters: {},
      pathInfo: "/api/test/local-error",
      queryString: ""
    };

    const response: any = await app.doGet(event);
    const content = JSON.parse(response.getContent());
    expect(content.body.message).toBe("Handled locally: Local error");
  });

  it("should handle exceptions globally via @ControllerAdvice", async () => {
    const event: any = {
      parameter: {
        path: "/api/test/error",
        headers: JSON.stringify({ Accept: "application/json" })
      },
      parameters: {},
      pathInfo: "/api/test/error",
      queryString: ""
    };

    const response: any = await app.doGet(event);
    const content = JSON.parse(response.getContent());
    expect(content.body.message).toBe("Handled globally: Test error");
  });
});
