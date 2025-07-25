# Boot for Google Apps Script Projects

`appsscript-boot` is a powerful, scalable, and modern framework for building high-performance Google Apps Script
applications.

## How to Install

To get started, install the dependencies:

```bash
npm install github:MaksymStoianov/appsscript-boot#main
```

> **Note:** It's recommended to use tags (`#vX.Y.Z`) for production environments to ensure version stability.

For example:

```bash
npm install github:MaksymStoianov/appsscript-boot#v1.0.0
```

## How to Use

### 1. Creating a Controller

Define a REST controller that will handle HTTP requests to your Apps Script web application:

```TypeScript
import {Get, RestController} from "appsscript-boot";

@RestController("api/sheet")
export class Sheet {
  @Get("active-range")
  getActiveRange(): string {
    return "This action return active range.";
  }
}
```