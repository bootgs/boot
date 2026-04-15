<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Artist: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

# Boot Framework for Google Apps Script™

<p align="left">
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/Built%20with-clasp-4285f4.svg" alt="Built with clasp"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/bootgs/boot?label=License" alt="License"></a>
  <a href="SECURITY.md"><img src="https://img.shields.io/badge/Security-Policy-brightgreen.svg" alt="Security Policy"></a>
  <a href="ROADMAP.md"><img src="https://img.shields.io/badge/Roadmap-View-blue.svg" alt="Roadmap"></a>
  <a href="https://github.com/bootgs/boot/releases"><img src="https://img.shields.io/github/v/release/bootgs/boot?label=Release" alt="Latest release"></a>
</p>

<p align="left">
  <a href="https://github.com/bootgs/boot/stargazers"><img src="https://img.shields.io/github/stars/bootgs/boot?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/bootgs/boot/forks"><img src="https://img.shields.io/github/forks/bootgs/boot?style=social" alt="GitHub Fork"></a>
  <a href="https://github.com/sponsors/MaksymStoianov"><img src="https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github" alt="GitHub Sponsors"></a>
</p>

## Introduction

**Boot.gs** is a lightweight framework designed to help build structured Google Apps Script applications. It aims to
bring familiar development patterns, such as decorators and dependency injection, to the Apps Script environment to
aid in code organization.

## Installation

Install the framework via npm:

```bash
npm install bootgs
```

## Quick Start

### 1. Define a Controller

Create a class to handle your application's logic. Decorators make it easy to map methods to specific endpoints or
events.

```TypeScript
import {Get, RestController} from "bootgs";

@RestController("api/sheet")
export class SheetController {
    /**
     * Handles GET requests to /api/sheet/active-range
     */
    @Get("active-range")
    getActiveRange(): string {
        return "This action returns the active sheet range.";
    }
}
```

### 2. Initialize the Application

Bootstrap your application by creating an `App` instance and delegating the standard Apps Script entry points (`doGet`, `doPost`) to it.

> [!IMPORTANT]
> The framework requires that you delegate these global entry points so it can intercept and route the incoming events.

#### Synchronous Application

Use `App` for synchronous execution:

```TypeScript
import {App} from "bootgs";
import {SheetController} from "./SheetController";

/**
 * Global entry point for GET requests.
 */
export function doGet(event: GoogleAppsScript.Events.DoGet) {
    const app = App.create({
        controllers: [SheetController]
    });
    return app.doGet(event);
}

/**
 * Global entry point for POST requests.
 */
export function doPost(event: GoogleAppsScript.Events.DoPost) {
    const app = App.create({
        controllers: [SheetController]
    });
    return app.doPost(event);
}
```

#### Asynchronous Application

Use `AsyncApp` when you need to handle asynchronous operations (e.g., `UrlFetchApp` promises or other async tasks) in your controllers:

> [!TIP]
> Only use `AsyncApp` if your controller methods are `async` or return a `Promise`. For standard synchronous tasks, the regular `App` is more lightweight.

```TypeScript
import {AsyncApp} from "bootgs";
import {SheetController} from "./SheetController";

/**
 * Global entry point for GET requests.
 */
export async function doGet(event: GoogleAppsScript.Events.DoGet) {
    const app = AsyncApp.create({
        controllers: [SheetController]
    });
    return await app.doGet(event);
}

/**
 * Global entry point for POST requests.
 */
export async function doPost(event: GoogleAppsScript.Events.DoPost) {
    const app = AsyncApp.create({
        controllers: [SheetController]
    });
    return await app.doPost(event);
}
```

## Features

- **Decorator-based Routing**: Intuitive mapping of HTTP and Apps Script events (GET, POST, etc.).
- **Spring Boot & NestJS Patterns**: Familiar decorators like `@RequestMapping`, `@RestController`, `@ResponseBody`, and the `ResponseEntity` class.
- **Flexible Responses**: Full control over HTTP status codes, headers, and MIME types using `ResponseEntity`.
- **Validation**: Declarative parameter validation using Spring Boot-style decorators like `@Min`, `@Max`, `@Email`, etc.
- **Pipes & Validation**: Transform and validate incoming data with `@UsePipes` and built-in pipes (e.g., `ParseNumberPipe`).
- **Global Error Handling**: Centralized exception management using `@ControllerAdvice` and `@ExceptionHandler`.
- **Dependency Injection**: Fully-featured DI for better decoupling and testability.
- **Type Safety**: Built with TypeScript for a robust development experience.
- **Modern Architecture**: Inspired by frameworks like NestJS and Spring Boot.

## Calling the API (Virtual Transport Layer)

The primary goal of **Boot.gs** is to ensure your code remains environment-agnostic. It should function identically whether it’s triggered via `doGet`/`doPost` or `google.script.run`.

Since Google Apps Script (GAS) has certain constraints on headers and routing, the framework implements a **Virtual Transport Layer**. This layer "tucks" your request metadata (like the HTTP method and path) into parameters so the framework handles the routing for you seamlessly.

### Virtual Request Parameters

To simulate a standard HTTP request, you pass these key parameters to the framework:

- `method`: Simulates the HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.).
- `pathname` (or `path`): The virtual resource path (e.g., `/api/users/1`).
- `headers`: A JSON-stringified object containing request headers.

> [!CAUTION]
> Never pass sensitive secrets in the `headers` object via query parameters!
> Since the Virtual Transport Layer passes all request metadata (including headers) via URL query parameters, you must never include sensitive information like API keys or Bearer tokens inside the `headers` object when calling the script via its Web App URL. URLs (and their query strings) are frequently logged in plain text. For sensitive data, always use the payload body of a `POST` request.

### Supported Response Types (MIME Types)

The framework supports a variety of output formats. You can specify the desired format using the `produces` property in the `@RequestMapping` decorator (or its aliases like `@Get`, `@Post`) or by returning a `ResponseEntity` with a specific MIME type.

<table width="100%">
  <thead>
    <tr>
      <th align="left">Enum Value</th>
      <th align="left">MIME Type</th>
      <th align="left">Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>JSON</code></td>
      <td><code>application/json</code></td>
      <td>Standard JSON via <code>ContentService</code></td>
    </tr>
    <tr>
      <td><code>TEXT</code></td>
      <td><code>text/plain</code></td>
      <td>Plain text output via <code>ContentService</code></td>
    </tr>
    <tr>
      <td><code>HTML</code></td>
      <td><code>text/html</code></td>
      <td>HTML content via <code>HtmlService</code></td>
    </tr>
    <tr>
      <td><code>XML</code></td>
      <td><code>application/xml</code></td>
      <td>XML content via <code>ContentService</code></td>
    </tr>
    <tr>
      <td><code>RSS</code></td>
      <td><code>application/rss+xml</code></td>
      <td>RSS feed via <code>ContentService</code></td>
    </tr>
    <tr>
      <td><code>ATOM</code></td>
      <td><code>application/atom+xml</code></td>
      <td>Atom feed via <code>ContentService</code></td>
    </tr>
    <tr>
      <td><code>CSV</code></td>
      <td><code>text/csv</code></td>
      <td>CSV data via <code>ContentService</code></td>
    </tr>
    <tr>
      <td><code>ICAL</code></td>
      <td><code>text/calendar</code></td>
      <td>iCalendar data via <code>ContentService</code></td>
    </tr>
    <tr>
      <td><code>VCARD</code></td>
      <td><code>text/vcard</code></td>
      <td>vCard data via <code>ContentService</code></td>
    </tr>
    <tr>
      <td><code>JAVASCRIPT</code></td>
      <td><code>application/javascript</code></td>
      <td>JavaScript output via <code>ContentService</code></td>
    </tr>
  </tbody>
</table>

### How to Call the API

#### 1. Internal Usage (`google.script.run`)

Use this when building Sidebars, Modals, or Add-ons.

> [!TIP]
> To receive a raw string (which is faster and easier to parse in client-side JS), include the `X-Request-Source: internal` header in your request.

**Example (Client-side JS):**

```javascript
const path = '/api/users/123';
const method = 'GET';
const headers = JSON.stringify({
  "X-Request-Source": "internal"
});

// Constructing the Virtual Transport Event
const event = {
  pathInfo: path,
  parameter: {
    method,
    pathname: path,
    headers
  },
  parameters: {
    method: [method],
    pathname: [path],
    headers: [headers]
  },
  queryString: `method=${method}&pathname=${encodeURIComponent(path)}&headers=${encodeURIComponent(headers)}`
};

google.script.run
  .withSuccessHandler(response => {
    // Parse the optimized string response
    const result = typeof response === 'string' ? JSON.parse(response) : response;
    
    console.log("Status:", result.status);
    console.log("Data:", result.body);
  })
  .doGet(event); 
```

#### 2. External Usage (Web App URL)

Use this when accessing the script via a direct link, a webhook, or a third-party service. This returns a standard GAS `TextOutput` or `HtmlOutput`.

**Example Request URL:**
`https://script.google.com/.../exec?method=GET&pathname=%2Fapi%2Fusers%2F123`

### Response Wrapping Logic

The framework automatically handles your controller's return value based on whether the `@ResponseBody` decorator is used (note that `@RestController` applies this by default):

#### A. Default Wrapper (No `@ResponseBody`)
If the controller method is not marked with `@ResponseBody`, the framework returns a full HTTP-like payload:
```json
{
  "status": 200,
  "statusText": "OK",
  "ok": true,
  "headers": { "Content-Type": "application/json" },
  "body": { "id": 123, "name": "John Doe" }
}
```

#### B. Direct Context (`@ResponseBody`)
If the method is marked with `@ResponseBody`, the framework bypasses the payload wrapper and returns only the data directly.

> [!TIP]
> **Custom Axios Adapter**
> Building those `google.script.run` payloads manually can be tedious. A custom Axios adapter specifically for GAS Web Apps is currently in development. It will completely abstract the virtual transport layer, allowing you to use standard `axios.get()` or `axios.post()` in your frontend.

> [!NOTE]
> Added full support for XML, RSS, and other MIME types as requested!

## Decorators

### Class decorators

<details open><summary>Class decorators</summary>

<table width="100%">
  <thead>
    <tr>
      <th align="left">Decorator</th>
      <th align="left">Returns</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>@Controller(type?: string, options?: object)</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a general-purpose controller.</td>
    </tr>
    <tr>
      <td><code>@RequestMapping(path?: string, method?: RequestMethod | RequestMethod[])</code></td>
      <td><code>ClassDecorator & MethodDecorator</code></td>
      <td>Maps a specific request path onto a controller or a handler method.</td>
    </tr>
    <tr>
      <td><code>@HttpController(basePath?: string)</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as an HTTP request controller. Default base path is <code>/</code>.</td>
    </tr>
    <tr>
      <td><code>@RestController(basePath?: string)</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a REST controller. Automatically applies <code>@ResponseBody</code> to all handler methods.</td>
    </tr>
    <tr>
      <td><code>@ResponseBody()</code></td>
      <td><code>ClassDecorator & MethodDecorator</code></td>
      <td>Indicates that the return value should be bound to the response body.</td>
    </tr>
    <tr>
      <td><code>@ControllerAdvice()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a global exception handler and data binder.</td>
    </tr>
    <tr>
      <td><code>@SheetController(sheetName?: string | string[] | RegExp)</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a Google Sheets event controller. Can be filtered by sheet name (string, array, or RegExp).</td>
    </tr>
    <tr>
      <td><code>@DocController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a Google Docs event controller.</td>
    </tr>
    <tr>
      <td><code>@SlideController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a Google Slides event controller.</td>
    </tr>
    <tr>
      <td><code>@FormController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a Google Forms event controller.</td>
    </tr>
    <tr>
      <td><code>@Service()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a service, typically holding business logic.</td>
    </tr>
    <tr>
      <td><code>@Repository()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a repository, abstracting data access logic.</td>
    </tr>
    <tr>
      <td><code>@Injectable()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as available for dependency injection.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Aliases</b></td>
    </tr>
    <tr>
      <td><code>@DocsController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Alias for <code>@DocController()</code>.</td>
    </tr>
    <tr>
      <td><code>@SlidesController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Alias for <code>@SlideController()</code>.</td>
    </tr>
    <tr>
      <td><code>@FormsController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Alias for <code>@FormController()</code>.</td>
    </tr>
  </tbody>
</table>

</details>

### Method decorators

<details open><summary>Method decorators</summary>

<table width="100%">
  <thead>
    <tr>
      <th align="left">Decorator</th>
      <th align="left">Returns</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>@Install()</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles <a href="https://developers.google.com/apps-script/guides/triggers#oninstalle"><code>onInstall</code></a> event.</td>
    </tr>
    <tr>
      <td><code>@Open()</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles <a href="https://developers.google.com/apps-script/guides/triggers#onopene"><code>onOpen</code></a> event.</td>
    </tr>
    <tr>
      <td><code>@Edit(...range?: (string | RegExp | string[])[])</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles <a href="https://developers.google.com/apps-script/guides/triggers#onedite"><code>onEdit</code></a> event. Filter by A1-notation, sheet name, or RegExp.</td>
    </tr>
    <tr>
      <td><code>@Change(changeType?: SheetsOnChangeChangeType | SheetsOnChangeChangeType[])</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles <code>onChange</code> event. Filter by <code>SheetsOnChangeChangeType</code>.</td>
    </tr>
    <tr>
      <td><code>@SelectionChange()</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles <a href="https://developers.google.com/apps-script/guides/triggers#onselectionchangee"><code>onSelectionChange</code></a> event.</td>
    </tr>
    <tr>
      <td><code>@FormSubmit(...formId?: (string | string[])[])</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles <code>onFormSubmit</code> event. Filter by one or more form IDs.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>HTTP Methods</b></td>
    </tr>
    <tr>
      <td><code>@RequestMapping(path?: string, method?: RequestMethod | RequestMethod[])</code></td>
      <td><code>ClassDecorator & MethodDecorator</code></td>
      <td>Maps a specific request path onto a controller or a handler method.</td>
    </tr>
    <tr>
      <td><code>@Get(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP GET requests. Default path is <code>/</code>.</td>
    </tr>
    <tr>
      <td><code>@Post(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP POST requests.</td>
    </tr>
    <tr>
      <td><code>@Put(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP PUT requests.</td>
    </tr>
    <tr>
      <td><code>@Patch(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP PATCH requests.</td>
    </tr>
    <tr>
      <td><code>@Delete(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP DELETE requests.</td>
    </tr>
    <tr>
      <td><code>@Head(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP HEAD requests.</td>
    </tr>
    <tr>
      <td><code>@Options(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP OPTIONS requests.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Error Handling & Security</b></td>
    </tr>
    <tr>
      <td><code>@ExceptionHandler(value?: Newable | Newable[])</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Annotation for handling exceptions in specific handler classes and/or handler methods.</td>
    </tr>
    <tr>
      <td><code>@ResponseStatus(value: number)</code></td>
      <td><code>MethodDecorator & ClassDecorator</code></td>
      <td>Marks a method or exception class with the status code that should be returned.</td>
    </tr>
    <tr>
      <td><code>@UsePipes(...pipes: any[])</code></td>
      <td><code>MethodDecorator & ClassDecorator</code></td>
      <td>Specifies the pipes to be used for a controller or method.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Aliases</b></td>
    </tr>
    <tr>
      <td><code>@GetMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Get()</code>.</td>
    </tr>
    <tr>
      <td><code>@PostMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Post()</code>.</td>
    </tr>
    <tr>
      <td><code>@PutMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Put()</code>.</td>
    </tr>
    <tr>
      <td><code>@PatchMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Patch()</code>.</td>
    </tr>
    <tr>
      <td><code>@DeleteMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Delete()</code>.</td>
    </tr>
    <tr>
      <td><code>@HeadMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Head()</code>.</td>
    </tr>
    <tr>
      <td><code>@OptionsMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Options()</code>.</td>
    </tr>
  </tbody>
</table>

</details>

### Parameter decorators

<details open><summary>Parameter decorators</summary>

<table width="100%">
  <thead>
    <tr>
      <th align="left">Decorator</th>
      <th align="left">Returns</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>@Event()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects the full Google Apps Script event object.</td>
    </tr>
    <tr>
      <td><code>@Request(key?: string)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects the full request object or a specific property.</td>
    </tr>
    <tr>
      <td><code>@Headers(key?: string)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects request headers or a specific header value.</td>
    </tr>
    <tr>
      <td><code>@Body(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects the full request body or a specific key. Supports transformation pipes.</td>
    </tr>
    <tr>
      <td><code>@Param(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects values from URL path parameters. Supports transformation pipes.</td>
    </tr>
    <tr>
      <td><code>@Query(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects values from URL query parameters. Supports transformation pipes.</td>
    </tr>
    <tr>
      <td><code>@Inject(token: any)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Explicitly specifies an injection token for a dependency.</td>
    </tr>
    <tr>
      <td><code>@Value(key: string)</code></td>
      <td><code>ParameterDecorator & PropertyDecorator</code></td>
      <td>Injects a value from the application configuration.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Aliases</b></td>
    </tr>
    <tr>
      <td><code>@Autowired(token?: any)</code></td>
      <td><code>ParameterDecorator & PropertyDecorator</code></td>
      <td>Alias for <code>@Inject()</code>.</td>
    </tr>
    <tr>
      <td><code>@RequestBody(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Alias for <code>@Body()</code>.</td>
    </tr>
    <tr>
      <td><code>@PathVariable(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Alias for <code>@Param()</code>.</td>
    </tr>
    <tr>
      <td><code>@RequestParam(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Alias for <code>@Query()</code>.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Validation Decorators (Spring Boot style)</b></td>
    </tr>
    <tr>
      <td><code>@AssertFalse()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is <code>false</code>.</td>
    </tr>
    <tr>
      <td><code>@AssertTrue()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is <code>true</code>.</td>
    </tr>
    <tr>
      <td><code>@Email()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is a valid email address.</td>
    </tr>
    <tr>
      <td><code>@Max(value: number)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is less than or equal to the specified maximum.</td>
    </tr>
    <tr>
      <td><code>@Min(value: number)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is greater than or equal to the specified minimum.</td>
    </tr>
    <tr>
      <td><code>@Negative()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is strictly negative.</td>
    </tr>
    <tr>
      <td><code>@NegativeOrZero()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is negative or zero.</td>
    </tr>
    <tr>
      <td><code>@NotBlank()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is not null and contains at least one non-whitespace character.</td>
    </tr>
    <tr>
      <td><code>@NotEmpty()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is not null and not empty (works for strings, arrays, and objects).</td>
    </tr>
    <tr>
      <td><code>@Pattern(regexp: string | RegExp)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value matches the specified regular expression.</td>
    </tr>
    <tr>
      <td><code>@Positive()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is strictly positive.</td>
    </tr>
    <tr>
      <td><code>@PositiveOrZero()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is positive or zero.</td>
    </tr>
    <tr>
      <td><code>@Size(options: { min?: number, max?: number })</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the size of the value is between the specified minimum and maximum.</td>
    </tr>
  </tbody>
</table>

</details>

### Built-in Pipes

Pipes can be used to transform data before it reaches your handler:

<table width="100%">
  <thead>
    <tr>
      <th align="left">Pipe</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ParseNumberPipe</code></td>
      <td>Transforms a string to a number.</td>
    </tr>
    <tr>
      <td><code>ParseFloatPipe</code></td>
      <td>Transforms a string to a float.</td>
    </tr>
    <tr>
      <td><code>ParseBooleanPipe</code></td>
      <td>Transforms a string to a boolean.</td>
    </tr>
    <tr>
      <td><code>AssertFalsePipe</code></td>
      <td>Validates that the value is <code>false</code>.</td>
    </tr>
    <tr>
      <td><code>AssertTruePipe</code></td>
      <td>Validates that the value is <code>true</code>.</td>
    </tr>
    <tr>
      <td><code>EmailPipe</code></td>
      <td>Validates that the value is a valid email address.</td>
    </tr>
    <tr>
      <td><code>MaxPipe</code></td>
      <td>Validates that the value is less than or equal to the specified maximum.</td>
    </tr>
    <tr>
      <td><code>MinPipe</code></td>
      <td>Validates that the value is greater than or equal to the specified minimum.</td>
    </tr>
    <tr>
      <td><code>NegativePipe</code></td>
      <td>Validates that the value is strictly negative.</td>
    </tr>
    <tr>
      <td><code>NegativeOrZeroPipe</code></td>
      <td>Validates that the value is negative or zero.</td>
    </tr>
    <tr>
      <td><code>NotBlankPipe</code></td>
      <td>Validates that the value is not blank.</td>
    </tr>
    <tr>
      <td><code>NotEmptyPipe</code></td>
      <td>Validates that the value is not empty.</td>
    </tr>
    <tr>
      <td><code>PatternPipe</code></td>
      <td>Validates that the value matches the specified regular expression.</td>
    </tr>
    <tr>
      <td><code>PositivePipe</code></td>
      <td>Validates that the value is strictly positive.</td>
    </tr>
    <tr>
      <td><code>PositiveOrZeroPipe</code></td>
      <td>Validates that the value is positive or zero.</td>
    </tr>
    <tr>
      <td><code>SizePipe</code></td>
      <td>Validates that the size of the value is within range.</td>
    </tr>
  </tbody>
</table>

## Controlling the Response

### ResponseEntity

The `ResponseEntity` class provides a flexible way to build full HTTP responses, including status codes, headers, and MIME types.

```TypeScript
import { Get, RestController, ResponseEntity, HttpStatus, ContentMimeType, Param } from "bootgs";

@RestController("users")
export class UserController {

    @Get("{id}")
    getUser(@Param("id") id: string): ResponseEntity {
        const user = { id, name: "John Doe" };

        if (!user) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok()
            .header("X-Custom-Header", "Value")
            .body(user);
    }

    @Get({ path: "export", produces: ContentMimeType.CSV })
    exportData(): ResponseEntity<string> {
        const csvData = "id,name\n1,John Doe";
        return ResponseEntity.ok(csvData);
    }
}
```

### ResponseBody

The `@ResponseBody` decorator indicates that the return value of a method should be bound directly to the response body, bypassing the default framework wrapper (which normally includes `status`, `ok`, and `body` fields in the JSON response).

> [!NOTE]
> `@RestController` automatically applies `@ResponseBody` to all its methods.

```TypeScript
import { Get, HttpController, ResponseBody } from "bootgs";

@HttpController("raw")
export class RawController {

    @Get("data")
    @ResponseBody()
    getRawData(): object {
        return { message: "This will be returned as the root JSON object" };
    }
}
```

## Advanced Examples

### Pipes

Transform parameters with pipes:

```TypeScript
import {Get, RestController, Query, ParseNumberPipe} from "bootgs";

@RestController("users")
export class UserController {

    @Get("details")
    getUserDetails(@Query("id", ParseNumberPipe) id: number): object {
        return {
            userId: id,
            message: "Success!"
        };
    }
}
```

### Global Error Handling

Use `@ControllerAdvice` to handle exceptions globally across the whole application:

```TypeScript
import {ControllerAdvice, ExceptionHandler, ResponseStatus} from "bootgs";

@ControllerAdvice()
export class GlobalExceptionHandler {

    @ExceptionHandler(Error)
    @ResponseStatus(500)
    handleError(error: Error): object {
        return {
            status: "Error",
            message: error.message
        };
    }
}
```

## Recommended

> [!TIP]
> For enhanced development with Google Apps Script, we recommend using [apps-script-utils](https://github.com/MaksymStoianov/apps-script-utils), a collection of utility functions and classes that complement this framework.

## Contributors

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct,
and the process for submitting pull requests.

## Roadmap

Check out our [Roadmap](ROADMAP.md) to see what we have planned for future releases.

## Changelog

For a detailed list of changes and updates, please refer to the [CHANGELOG](CHANGELOG.md).

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

---

<p align="center">
  ⭐ <b>Like this project?</b> Give it a star on <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
