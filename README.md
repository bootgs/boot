<a name="top"></a>

# Boot for Google Apps Script Projects

[![Built%20with-clasp](https://img.shields.io/badge/Built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![License](https://img.shields.io/github/license/MaksymStoianov/appsscript-boot?label=License)](LICENSE)
[![Latest release](https://img.shields.io/github/v/release/MaksymStoianov/appsscript-boot?label=Release)](https://github.com/MaksymStoianov/appsscript-boot/releases)

[![GitHub Stars](https://img.shields.io/github/stars/MaksymStoianov/appsscript-boot?style=social)](https://github.com/MaksymStoianov/appsscript-boot/stargazers)
[![GitHub Fork](https://img.shields.io/github/forks/MaksymStoianov/appsscript-boot?style=social)](https://github.com/MaksymStoianov/appsscript-boot/forks)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github)](https://github.com/sponsors/MaksymStoianov)

## Introduction

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

## Decorators

### Class decorators

<details open><summary>Class decorators</summary>

| Decorator             | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `@Controller()`       | Marks a class as a general-purpose controller.                |
| `@Service()`          | Marks a class as a service, typically holding business logic. |
| `@Repository()`       | Marks a class as a repository, abstracting data access logic. |
| `@Injectable()`       | Marks a class as available for dependency injection.          |
| `@HttpController()`   | Marks a class as an HTTP request controller.                  |
| `@RestController()`   | Alias for `@HttpController()`.                                |
| `@DocController()`    | Marks a class as a Google Docs event controller.              |
| `@DocsController()`   | Alias for `@DocController()`.                                 |
| `@FormController()`   | Marks a class as a Google Forms event controller.             |
| `@FormsController()`  | Alias for `@FormController()`.                                |
| `@SheetController()`  | Marks a class as a Google Sheets event controller.            |
| `@SheetsController()` | Alias for `@SheetController()`.                               |
| `@SlideController()`  | Marks a class as a Google Slides event controller.            |
| `@SlidesController()` | Alias for `@SlideController()`.                               |

</details>

### Method decorators

<details open><summary>Method decorators</summary>

| Decorator            | Description                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@Install()`         | Handles [`onInstall`](https://developers.google.com/apps-script/guides/triggers#oninstalle) event, triggered when the add-on is first installed.             |
| `@Open()`            | Handles [`onOpen`](https://developers.google.com/apps-script/guides/triggers#onopene) event, triggered when a Google Sheet is opened.                        |
| `@Edit()`            | Handles [`onEdit`](https://developers.google.com/apps-script/guides/triggers#onedite) event, triggered by manual cell changes in a Google Sheet.             |
| `@Change()`          | Handles `onChange` event, triggered by any structural or content change in a Google Sheet.                                                                   |
| `@SelectionChange()` | Handles [`onSelectionChange`](https://developers.google.com/apps-script/guides/triggers#onselectionchangee) event, triggered by user cell selection changes. |
| `@FormSubmit()`      | Handles `onFormSubmit` event, triggered when a form connected to a Google Sheet is submitted.                                                                |
| `@Post()`            | Maps a method to handle HTTP POST requests.                                                                                                                  |
| `@Get()`             | Maps a method to handle HTTP GET requests.                                                                                                                   |
| `@Delete()`          | Maps a method to handle HTTP DELETE requests.                                                                                                                |
| `@Put()`             | Maps a method to handle HTTP PUT requests.                                                                                                                   |
| `@Patch()`           | Maps a method to handle HTTP PATCH requests.                                                                                                                 |
| `@Options()`         | Maps a method to handle HTTP OPTIONS requests.                                                                                                               |
| `@Head()`            | Maps a method to handle HTTP HEAD requests.                                                                                                                  |
| `@PostMapping()`     | Alias for `@Post()`.                                                                                                                                         |
| `@GetMapping()`      | Alias for `@Get()`.                                                                                                                                          |
| `@DeleteMapping()`   | Alias for `@Delete()`.                                                                                                                                       |
| `@PutMapping()`      | Alias for `@Put()`.                                                                                                                                          |
| `@PatchMapping()`    | Alias for `@Patch()`.                                                                                                                                        |
| `@OptionsMapping()`  | Alias for `@Options()`.                                                                                                                                      |
| `@HeadMapping()`     | Alias for `@Head()`.                                                                                                                                         |

</details>

### Parameter decorators

<details open><summary>Parameter decorators</summary>

| Decorator         | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `@Event()`        | Injects the full Google Apps Script event object.          |
| `@Request()`      | Injects the full request object or a specific key from it. |
| `@Headers()`      | Injects request headers or a specific header value.        |
| `@Param()`        | Injects values from URL path parameters.                   |
| `@PathVariable()` | Alias for `@Param()`.                                      |
| `@Query()`        | Injects values from URL query parameters.                  |
| `@RequestParam()` | Alias for `@Query()`.                                      |
| `@Body()`         | Injects the full request body or a specific key from it.   |
| `@RequestBody()`  | Alias for `@Body()`.                                       |
| `@Inject()`       | Explicitly specifies an injection token for a dependency.  |

</details>

## Tasks

<details><summary>More</summary>

- [ ] Develop a `Cron` decorator for methods.
- [ ] Develop a `Response` decorator for parameters.

</details>

## Changelog

For a detailed list of changes and updates, please refer to the [CHANGELOG](CHANGELOG.md) file.

## License

This project is licensed under the [LICENSE](LICENSE) file.

---

⭐ **Like this project?** [Star our awesome repo »](https://github.com/MaksymStoianov/appsscript-boot)
