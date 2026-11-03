<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>画师：<a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [日本語](README.ja.md) | **中文**

> 本译文在 AI 辅助下根据 1.10.0 版本的 [README.md](README.md) 翻译而成，内容以英文版 README 为准。欢迎提出修改建议，详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

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

## 简介

**Boot.gs** 是一个轻量级框架，用于构建结构清晰的 Google Apps Script 应用。它把装饰器、依赖注入等常见的开发模式引入 Apps Script 环境，让代码更易于组织。

控制器与运行环境无关：同一套代码既能处理 `doGet`/`doPost` Web 请求，也能处理来自侧边栏和对话框的 `google.script.run` 调用，以及 `onOpen`、`onEdit` 等 Google Workspace 事件。

## 功能特性

- **基于装饰器的路由**：直观地映射 HTTP 请求和 Apps Script 事件（GET、POST 等）。
- **Spring Boot 与 NestJS 模式**：熟悉的 `@RequestMapping`、`@RestController`、`@ResponseBody` 等装饰器以及 `ResponseEntity` 类。
- **灵活的响应**：通过 `ResponseEntity` 完全控制 HTTP 状态码、响应头和 MIME 类型。
- **参数校验**：使用 `@Min`、`@Max`、`@Email` 等 Spring Boot 风格的装饰器进行声明式参数校验。
- **Pipes 与校验**：通过 `@UsePipes` 和内置 pipes（如 `ParseNumberPipe`）转换并校验输入数据。
- **全局错误处理**：使用 `@ControllerAdvice` 和 `@ExceptionHandler` 集中管理异常。
- **依赖注入**：功能完整的 DI，降低耦合、便于测试。
- **类型安全**：基于 TypeScript 构建，开发体验更可靠。
- **现代架构**：借鉴 NestJS 和 Spring Boot 等框架的设计。

## 环境要求

- 使用 V8 运行时的 Google Apps Script 项目，通常通过 [clasp](https://github.com/google/clasp) 在本地管理。
- 在 `tsconfig.json` 中启用 `experimentalDecorators` 和 `emitDecoratorMetadata` 的 TypeScript。
- 用于安装和构建的 Node.js `>=22.14.0` 及 npm。

## 安装

通过 npm 安装框架：

```bash
npm install bootgs
```

## 快速上手

### 1. 定义控制器

创建一个承载应用逻辑的类。装饰器负责把方法映射到具体的端点或事件。

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

### 2. 初始化应用

创建 `App` 实例，并把 Apps Script 的标准入口函数委托给它，框架就能拦截并路由传入的事件。

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

包含 `doPost` 和异步 `AsyncApp` 的完整步骤，请参阅 [Quick Start 指南](docs/guide/quick-start.md)（英文）。

## 文档

详细指南目前提供英文版：

- [Quick Start](docs/guide/quick-start.md)：同步 `App` 与异步 `AsyncApp` 的配置。
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md)：请求参数、MIME 类型、通过 `google.script.run` 和 Web 应用 URL 调用、响应包装。
- [Decorators](docs/guide/decorators.md)：类、方法和参数装饰器，校验与内置 pipes。
- [Controlling the Response](docs/guide/responses.md)：`ResponseEntity` 与 `@ResponseBody`。
- [Advanced Examples](docs/guide/examples.md)：pipes 与全局错误处理。
- [AI Agent Skills](docs/guide/ai-agent-skills.md)：完整的技能列表与安装方式。
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md)：架构对比。

## AI 智能体技能

正在使用 AI 编程智能体（Claude Code、Gemini CLI、Cursor 等）？**[bootgs/skills](https://github.com/bootgs/skills)** 仓库提供了一组 Agent Skills，教会智能体如何搭建、组织和校验 **Boot.gs** 应用，另外还有适用于一般 Google Apps Script 开发、与框架无关的技能。

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

完整列表以及 Gemini CLI 和 `npx skills` 的安装方式，请参阅 [AI Agent Skills](docs/guide/ai-agent-skills.md)。

## 推荐

> [!TIP]
> 为了更顺畅地进行 Google Apps Script 开发，推荐使用 [apps-script-utils](https://github.com/MaksymStoianov/apps-script-utils)，它是一组与本框架相辅相成的工具函数和类。

## 贡献者

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## 参与贡献

欢迎贡献！行为准则和提交 pull request 的流程请参阅 [贡献指南](CONTRIBUTING.md)。如需报告安全漏洞，请遵循 [安全策略](SECURITY.md)。

## 路线图

查看 [路线图](ROADMAP.md)，了解后续版本的计划。

## 更新日志

详细的变更与更新列表请参阅 [CHANGELOG](CHANGELOG.md)。

## 支持

问题和错误报告请提交到 [GitHub Issues](https://github.com/bootgs/boot/issues)。如果这个项目对你有帮助，欢迎通过 [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) 或 [Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov) 支持它。

## 许可证

本项目基于 [Apache-2.0 许可证](LICENSE) 发布。

---

<p align="center">
  ⭐ <b>喜欢这个项目吗？</b>欢迎在 <a href="https://github.com/bootgs/boot">GitHub</a> 上点亮星标！
</p>
