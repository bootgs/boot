<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](../assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>藝術家：<a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | **繁體中文**

> 本翻譯以 AI 輔助，依據版本 1.10.0 的 [README.md](../../README.md) 製作。英文版 README 為參考版本。歡迎提出修正，詳見 [CONTRIBUTING.md](../../CONTRIBUTING.md)。

# Boot Framework for Google Apps Script™

<p align="left">
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/Built%20with-clasp-4285f4.svg" alt="Built with clasp"></a>
  <a href="../../LICENSE"><img src="https://img.shields.io/github/license/bootgs/boot?label=License" alt="License"></a>
  <a href="../../SECURITY.md"><img src="https://img.shields.io/badge/Security-Policy-brightgreen.svg" alt="Security Policy"></a>
  <a href="../../ROADMAP.md"><img src="https://img.shields.io/badge/Roadmap-View-blue.svg" alt="Roadmap"></a>
  <a href="https://github.com/bootgs/boot/releases"><img src="https://img.shields.io/github/v/release/bootgs/boot?label=Release" alt="Latest release"></a>
</p>

<p align="left">
  <a href="https://github.com/bootgs/boot/stargazers"><img src="https://img.shields.io/github/stars/bootgs/boot?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/bootgs/boot/forks"><img src="https://img.shields.io/github/forks/bootgs/boot?style=social" alt="GitHub Fork"></a>
  <a href="https://github.com/sponsors/MaksymStoianov"><img src="https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github" alt="GitHub Sponsors"></a>
</p>

## 簡介

**Boot.gs** 是一個輕量級框架，協助你建立結構清晰的 Google Apps Script 應用程式。它將裝飾器、相依性注入等常見的開發模式帶進 Apps Script 環境，讓程式碼更容易組織。

你的控制器不受執行環境限制：同一份程式碼即可處理 `doGet`/`doPost` 網頁請求、側邊欄與對話框發出的 `google.script.run` 呼叫，以及 `onOpen`、`onEdit` 等 Google Workspace 事件。

## 功能

- **以裝飾器為基礎的路由**：直覺地對應 HTTP 與 Apps Script 事件（GET、POST 等）。
- **Spring Boot 與 NestJS 模式**：熟悉的裝飾器，例如 `@RequestMapping`、`@RestController`、`@ResponseBody`，以及 `ResponseEntity` 類別。
- **彈性的回應**：透過 `ResponseEntity` 完整控制 HTTP 狀態碼、標頭與 MIME 類型。
- **驗證**：使用 `@Min`、`@Max`、`@Email` 等 Spring Boot 風格的裝飾器，以宣告式方式驗證參數。
- **Pipes 與驗證**：透過 `@UsePipes` 與內建 pipes（例如 `ParseNumberPipe`）轉換並驗證傳入的資料。
- **全域錯誤處理**：使用 `@ControllerAdvice` 與 `@ExceptionHandler` 集中管理例外。
- **相依性注入**：功能完整的 DI，降低耦合並提升可測試性。
- **型別安全**：以 TypeScript 打造，提供穩健的開發體驗。
- **現代化架構**：設計靈感來自 NestJS 與 Spring Boot 等框架。

## 系統需求

- 使用 V8 執行階段的 Google Apps Script 專案，通常以 [clasp](https://github.com/google/clasp) 在本機管理。
- 在 `tsconfig.json` 中啟用 `experimentalDecorators` 與 `emitDecoratorMetadata` 的 TypeScript。
- 用於安裝與建置的 Node.js `>=22.14.0` 及 npm。

## 安裝

透過 npm 安裝框架：

```bash
npm install bootgs
```

## 快速入門

### 1. 定義控制器

建立一個類別來處理應用程式的邏輯。裝飾器會將方法對應到特定的端點或事件。

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

### 2. 初始化應用程式

建立 `App` 實例，並將 Apps Script 的標準進入點委派給它，讓框架能攔截並路由傳入的事件。

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

包含 `doPost` 與非同步 `AsyncApp` 的完整說明，請參閱 [Quick Start 指南](../guide/quick-start.md)（英文）。

## 文件

詳細指南僅提供英文版：

- [Quick Start](../guide/quick-start.md)：同步 `App` 與非同步 `AsyncApp` 的設定。
- [Calling the API (Virtual Transport Layer)](../guide/virtual-transport-layer.md)：請求參數、MIME 類型、透過 `google.script.run` 與 Web 應用程式 URL 呼叫、回應包裝。
- [Decorators](../guide/decorators.md)：類別、方法與參數裝飾器、驗證及內建 pipes。
- [Controlling the Response](../guide/responses.md)：`ResponseEntity` 與 `@ResponseBody`。
- [Advanced Examples](../guide/examples.md)：pipes 與全域錯誤處理。
- [AI Agent Skills](../guide/ai-agent-skills.md)：完整的技能清單與安裝方式。
- [Boot.gs vs Spring Boot vs NestJS](../comparison.md)：架構比較。

## AI 代理技能

正在使用 AI 程式設計代理（Claude Code、Gemini CLI、Cursor 等）嗎？**[bootgs/skills](https://github.com/bootgs/skills)** 儲存庫提供 Agent Skills，教導代理如何建立 **Boot.gs** 應用程式的骨架、規劃結構並加以驗證，另外也提供不限框架、適用於 Google Apps Script 開發的通用技能。

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

完整清單以及透過 Gemini CLI 與 `npx skills` 安裝的方式，請參閱 [AI Agent Skills](../guide/ai-agent-skills.md)。

## 推薦

> [!TIP]
> 為了讓 Google Apps Script 開發更順手，我們推薦使用 [@bootgs/utils](https://github.com/bootgs/utils)，這是一組可搭配本框架使用的工具函式與類別。

## 貢獻者

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## 參與貢獻

歡迎各種貢獻！關於行為準則與提交 pull request 的流程，請參閱[貢獻指南](../../CONTRIBUTING.md)。如需回報安全漏洞，請依照[安全政策](../../SECURITY.md)辦理。

## 路線圖

請查看[路線圖](../../ROADMAP.md)，了解未來版本的規劃。

## 變更紀錄

詳細的變更與更新清單，請參閱 [CHANGELOG](../../CHANGELOG.md)。

## 支持

問題與錯誤回報請提交至 [GitHub Issues](https://github.com/bootgs/boot/issues)。如果本專案對你有幫助，歡迎透過 [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) 或 [Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov) 支持我們。

## 授權條款

本專案採用 [Apache-2.0 授權條款](../../LICENSE)。

---

<p align="center">
  ⭐ <b>喜歡這個專案嗎？</b>歡迎到 <a href="https://github.com/bootgs/boot">GitHub</a> 給我們一顆星！
</p>
