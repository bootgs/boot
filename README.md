<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Artist: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

**English** | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

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

Your controllers stay environment-agnostic: the same code handles `doGet`/`doPost` web requests, `google.script.run`
calls from sidebars and dialogs, and Google Workspace events such as `onOpen` or `onEdit`.

## Features

- **Decorator-based Routing**: Intuitive mapping of HTTP and Apps Script events (GET, POST, etc.).
- **Spring Boot & NestJS Patterns**: Familiar decorators like `@RequestMapping`, `@RestController`, `@ResponseBody`, and
  the `ResponseEntity` class.
- **Flexible Responses**: Full control over HTTP status codes, headers, and MIME types using `ResponseEntity`.
- **Validation**: Declarative parameter validation using Spring Boot-style decorators like `@Min`, `@Max`, `@Email`,
  etc.
- **Pipes & Validation**: Transform and validate incoming data with `@UsePipes` and built-in pipes (e.g.,
  `ParseNumberPipe`).
- **Global Error Handling**: Centralized exception management using `@ControllerAdvice` and `@ExceptionHandler`.
- **Dependency Injection**: Fully-featured DI for better decoupling and testability.
- **Type Safety**: Built with TypeScript for a robust development experience.
- **Modern Architecture**: Inspired by frameworks like NestJS and Spring Boot.

## Requirements

- A Google Apps Script project on the V8 runtime, typically managed locally with [clasp](https://github.com/google/clasp).
- TypeScript with `experimentalDecorators` and `emitDecoratorMetadata` enabled in `tsconfig.json`.
- Node.js `>=22.14.0` and npm for installing and building.

## Installation

Install the framework via npm:

```bash
npm install bootgs
```

## Quick Start

### 1. Define a Controller

Create a class to handle your application's logic. Decorators map methods to specific endpoints or events.

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

Create an `App` instance and delegate the standard Apps Script entry points to it, so the framework can intercept and
route incoming events.

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
```

The full walkthrough, including `doPost` and the asynchronous `AsyncApp`, is in the
[Quick Start guide](docs/guide/quick-start.md).

## Documentation

- [Quick Start](docs/guide/quick-start.md): synchronous `App` and asynchronous `AsyncApp` setup.
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): request parameters, MIME types,
  `google.script.run` and Web App URL calls, response wrapping.
- [Decorators](docs/guide/decorators.md): class, method and parameter decorators, validation and built-in pipes.
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity` and `@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md): pipes and global error handling.
- [AI Agent Skills](docs/guide/ai-agent-skills.md): the full skill list and installation options.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): architecture comparison.

## AI Agent Skills

Working with an AI coding agent (Claude Code, Gemini CLI, Cursor, etc.)? The
**[bootgs/skills](https://github.com/bootgs/skills)** repository provides Agent Skills that teach it how to scaffold,
structure, and validate **Boot.gs** applications, plus framework-agnostic skills for Google Apps Script development.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

See [AI Agent Skills](docs/guide/ai-agent-skills.md) for the full list and for Gemini CLI and `npx skills` installation.

## Recommended

> [!TIP]
> For enhanced development with Google Apps Script, we recommend using
> [@bootgs/utils](https://github.com/bootgs/utils), a collection of utility functions and
> classes that complement this framework.

## Contributors

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct,
and the process for submitting pull requests. To report a vulnerability, follow the [Security Policy](SECURITY.md).

## Roadmap

Check out our [Roadmap](ROADMAP.md) to see what we have planned for future releases.

## Changelog

For a detailed list of changes and updates, please refer to the [CHANGELOG](CHANGELOG.md).

## Support

Questions and bug reports go to [GitHub Issues](https://github.com/bootgs/boot/issues). If the project helps you,
you can support it via [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) or
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

---

<p align="center">
  ⭐ <b>Like this project?</b> Give it a star on <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
