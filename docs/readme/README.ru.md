<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](../assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Художница: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | **Русский** | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Этот перевод подготовлен с помощью ИИ на основе [README.md](../../README.md) для версии 1.10.0. Основной считается
> английская версия README. Исправления приветствуются — см. [CONTRIBUTING.md](../../CONTRIBUTING.md).

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

## Введение

**Boot.gs** — лёгкий фреймворк для создания структурированных приложений на Google Apps Script. Он переносит в среду
Apps Script привычные подходы к разработке, такие как декораторы и внедрение зависимостей, чтобы код было проще
организовать.

Контроллеры не зависят от среды: один и тот же код обрабатывает веб-запросы `doGet`/`doPost`, вызовы
`google.script.run` из боковых панелей и диалогов, а также события Google Workspace, например `onOpen` или `onEdit`.

## Возможности

- **Маршрутизация на декораторах**: удобное сопоставление HTTP-запросов и событий Apps Script (GET, POST и т. д.).
- **Паттерны Spring Boot и NestJS**: знакомые декораторы `@RequestMapping`, `@RestController`, `@ResponseBody` и класс
  `ResponseEntity`.
- **Гибкие ответы**: полный контроль над HTTP-кодами статуса, заголовками и MIME-типами через `ResponseEntity`.
- **Валидация**: декларативная проверка параметров декораторами в стиле Spring Boot — `@Min`, `@Max`, `@Email` и др.
- **Pipes и валидация**: преобразование и проверка входящих данных с помощью `@UsePipes` и встроенных pipes (например,
  `ParseNumberPipe`).
- **Глобальная обработка ошибок**: централизованное управление исключениями через `@ControllerAdvice` и
  `@ExceptionHandler`.
- **Внедрение зависимостей**: полноценный DI для слабой связанности и удобного тестирования.
- **Типобезопасность**: написан на TypeScript для надёжной разработки.
- **Современная архитектура**: вдохновлён фреймворками NestJS и Spring Boot.

## Требования

- Проект Google Apps Script на среде выполнения V8, обычно управляемый локально через [clasp](https://github.com/google/clasp).
- TypeScript с включёнными `experimentalDecorators` и `emitDecoratorMetadata` в `tsconfig.json`.
- Node.js `>=22.14.0` и npm для установки и сборки.

## Установка

Установите фреймворк через npm:

```bash
npm install bootgs
```

## Быстрый старт

### 1. Создайте контроллер

Создайте класс с логикой приложения. Декораторы привязывают методы к конкретным эндпоинтам или событиям.

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

### 2. Инициализируйте приложение

Создайте экземпляр `App` и делегируйте ему стандартные точки входа Apps Script, чтобы фреймворк мог перехватывать и
маршрутизировать входящие события.

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

Полный пошаговый пример, в том числе с `doPost` и асинхронным `AsyncApp`, — в
[руководстве Quick Start](../guide/quick-start.md) (на английском).

## Документация

Подробные руководства доступны на английском:

- [Quick Start](../guide/quick-start.md): настройка синхронного `App` и асинхронного `AsyncApp`.
- [Calling the API (Virtual Transport Layer)](../guide/virtual-transport-layer.md): параметры запроса, MIME-типы,
  вызовы через `google.script.run` и URL веб-приложения, обёртка ответов.
- [Decorators](../guide/decorators.md): декораторы классов, методов и параметров, валидация и встроенные pipes.
- [Controlling the Response](../guide/responses.md): `ResponseEntity` и `@ResponseBody`.
- [Advanced Examples](../guide/examples.md): pipes и глобальная обработка ошибок.
- [AI Agent Skills](../guide/ai-agent-skills.md): полный список навыков и способы установки.
- [Boot.gs vs Spring Boot vs NestJS](../comparison.md): сравнение архитектур.

## Навыки для ИИ-агентов

Работаете с ИИ-агентом для программирования (Claude Code, Gemini CLI, Cursor и др.)? Репозиторий
**[bootgs/skills](https://github.com/bootgs/skills)** содержит Agent Skills, которые учат агента создавать каркас,
структурировать и проверять приложения **Boot.gs**, а также универсальные навыки для разработки на Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

Полный список и установка для Gemini CLI и `npx skills` — в разделе [AI Agent Skills](../guide/ai-agent-skills.md).

## Рекомендуем

> [!TIP]
> Для более удобной разработки на Google Apps Script рекомендуем [@bootgs/utils](https://github.com/bootgs/utils) —
> набор служебных функций и классов, дополняющих этот фреймворк.

## Участники

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Как внести вклад

Мы рады вашему участию! Правила сообщества и порядок отправки pull request описаны в
[руководстве для участников](../../CONTRIBUTING.md). Чтобы сообщить об уязвимости, следуйте [политике безопасности](../../SECURITY.md).

## Дорожная карта

Планы на будущие релизы — в [дорожной карте](../../ROADMAP.md).

## Журнал изменений

Подробный список изменений и обновлений — в [CHANGELOG](../../CHANGELOG.md).

## Поддержка

Вопросы и сообщения об ошибках — в [GitHub Issues](https://github.com/bootgs/boot/issues). Если проект вам полезен,
поддержите его через [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) или
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Лицензия

Проект распространяется по [лицензии Apache-2.0](../../LICENSE).

---

<p align="center">
  ⭐ <b>Нравится проект?</b> Поставьте звезду на <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
