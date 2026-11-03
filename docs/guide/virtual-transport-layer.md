# Calling the API (Virtual Transport Layer)

[← Back to README](../../README.md) · [Documentation index](README.md)

The primary goal of **Boot.gs** is to ensure your code remains environment-agnostic. It should function identically
whether it’s triggered via `doGet`/`doPost` or `google.script.run`.

Since Google Apps Script (GAS) has certain constraints on headers and routing, the framework implements a **Virtual
Transport Layer**. This layer "tucks" your request metadata (like the HTTP method and path) into parameters so the
framework handles the routing for you seamlessly.

## Virtual Request Parameters

To simulate a standard HTTP request, you pass these key parameters to the framework:

- `method`: Simulates the HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.).
- `pathname` (or `path`): The virtual resource path (e.g., `/api/users/1`).
- `headers`: A JSON-stringified object containing request headers.

> [!CAUTION]
> Never pass sensitive secrets in the `headers` object via query parameters!
> Since the Virtual Transport Layer passes all request metadata (including headers) via URL query parameters, you must
> never include sensitive information like API keys or Bearer tokens inside the `headers` object when calling the script
> via its Web App URL. URLs (and their query strings) are frequently logged in plain text. For sensitive data, always use
> the payload body of a `POST` request.

## Supported Response Types (MIME Types)

The framework supports a variety of output formats. You can specify the desired format using the `produces` property in
the `@RequestMapping` decorator (or its aliases like `@Get`, `@Post`) or by returning a `ResponseEntity` with a specific
MIME type.

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

## How to Call the API

### 1. Internal Usage (`google.script.run`)

Use this when building Sidebars, Modals, or Add-ons.

> [!TIP]
> To receive a raw string (which is faster and easier to parse in client-side JS), include the
> `X-Request-Source: internal` header in your request.

**Example (Client-side JS):**

```javascript
const path = "/api/users/123";
const method = "GET";
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
  .withSuccessHandler((response) => {
    // Parse the optimized string response
    const result = typeof response === "string" ? JSON.parse(response) : response;

    console.log("Status:", result.status);
    console.log("Data:", result.body);
  })
  .doGet(event);
```

### 2. External Usage (Web App URL)

Use this when accessing the script via a direct link, a webhook, or a third-party service. This returns a standard GAS
`TextOutput` or `HtmlOutput`.

**Example Request URL:**
`https://script.google.com/.../exec?method=GET&pathname=%2Fapi%2Fusers%2F123`

## Response Wrapping Logic

The framework automatically handles your controller's return value based on whether the `@ResponseBody` decorator is
used (note that `@RestController` applies this by default):

### A. Default Wrapper (No `@ResponseBody`)

If the controller method is not marked with `@ResponseBody`, the framework returns a full HTTP-like payload:

```json
{
  "status": 200,
  "statusText": "OK",
  "ok": true,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "id": 123,
    "name": "John Doe"
  }
}
```

### B. Direct Context (`@ResponseBody`)

If the method is marked with `@ResponseBody`, the framework bypasses the payload wrapper and returns only the data
directly.

> [!TIP]
> **Custom Axios Adapter**
> Building those `google.script.run` payloads manually can be tedious. A custom Axios adapter specifically for GAS Web
> Apps is currently in development. It will completely abstract the virtual transport layer, allowing you to use standard
> `axios.get()` or `axios.post()` in your frontend.

> [!NOTE]
> Added full support for XML, RSS, and other MIME types as requested!
