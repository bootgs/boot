# Quick Start

[← Back to README](../../README.md) · [Documentation index](README.md)

## 1. Define a Controller

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

## 2. Initialize the Application

Bootstrap your application by creating an `App` instance and delegating the standard Apps Script entry points (`doGet`,
`doPost`) to it.

> [!IMPORTANT]
> The framework requires that you delegate these global entry points so it can intercept and route the incoming events.

### Synchronous Application

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

### Asynchronous Application

Use `AsyncApp` when you need to handle asynchronous operations (e.g., `UrlFetchApp` promises or other async tasks) in
your controllers:

> [!TIP]
> Only use `AsyncApp` if your controller methods are `async` or return a `Promise`. For standard synchronous tasks, the
> regular `App` is more lightweight.

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
