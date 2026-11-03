<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](../assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Artystka: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | **Polski** | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> To tłumaczenie przygotowano z pomocą AI na podstawie [README.md](../../README.md) dla wersji 1.10.0. Wersją wzorcową jest angielskie README. Poprawki są mile widziane: zajrzyj do [CONTRIBUTING.md](../../CONTRIBUTING.md).

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

## Wprowadzenie

**Boot.gs** to lekki framework, który pomaga tworzyć dobrze ustrukturyzowane aplikacje Google Apps Script. Przenosi do
środowiska Apps Script znane wzorce programistyczne, takie jak dekoratory i wstrzykiwanie zależności, aby ułatwić
organizację kodu.

Twoje kontrolery nie zależą od środowiska: ten sam kod obsługuje żądania webowe `doGet`/`doPost`, wywołania
`google.script.run` z paneli bocznych i okien dialogowych oraz zdarzenia Google Workspace, takie jak `onOpen` czy
`onEdit`.

## Funkcje

- **Routing oparty na dekoratorach**: intuicyjne mapowanie zdarzeń HTTP i Apps Script (GET, POST itd.).
- **Wzorce ze Spring Boot i NestJS**: znane dekoratory, takie jak `@RequestMapping`, `@RestController`,
  `@ResponseBody`, oraz klasa `ResponseEntity`.
- **Elastyczne odpowiedzi**: pełna kontrola nad kodami statusu HTTP, nagłówkami i typami MIME dzięki `ResponseEntity`.
- **Walidacja**: deklaratywna walidacja parametrów za pomocą dekoratorów w stylu Spring Boot, takich jak `@Min`,
  `@Max`, `@Email` itd.
- **Pipes i walidacja**: przekształcanie i walidacja danych wejściowych za pomocą `@UsePipes` i wbudowanych pipes (np.
  `ParseNumberPipe`).
- **Globalna obsługa błędów**: scentralizowane zarządzanie wyjątkami za pomocą `@ControllerAdvice` i
  `@ExceptionHandler`.
- **Wstrzykiwanie zależności**: w pełni funkcjonalne DI dla lepszego rozdzielenia komponentów i łatwiejszego
  testowania.
- **Bezpieczeństwo typów**: napisany w TypeScript, co zapewnia solidne środowisko programistyczne.
- **Nowoczesna architektura**: inspirowana frameworkami takimi jak NestJS i Spring Boot.

## Wymagania

- Projekt Google Apps Script działający w środowisku uruchomieniowym V8, zwykle zarządzany lokalnie za pomocą [clasp](https://github.com/google/clasp).
- TypeScript z włączonymi opcjami `experimentalDecorators` i `emitDecoratorMetadata` w `tsconfig.json`.
- Node.js `>=22.14.0` oraz npm do instalacji i budowania.

## Instalacja

Zainstaluj framework przez npm:

```bash
npm install bootgs
```

## Szybki start

### 1. Zdefiniuj kontroler

Utwórz klasę obsługującą logikę aplikacji. Dekoratory mapują metody na konkretne endpointy lub zdarzenia.

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

### 2. Zainicjalizuj aplikację

Utwórz instancję `App` i przekaż do niej standardowe punkty wejścia Apps Script, aby framework mógł przechwytywać
i kierować przychodzące zdarzenia.

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

Pełny przewodnik, obejmujący także `doPost` i asynchroniczną aplikację `AsyncApp`, znajdziesz w
[przewodniku Quick Start](../guide/quick-start.md) (po angielsku).

## Dokumentacja

Szczegółowe przewodniki są dostępne po angielsku:

- [Quick Start](../guide/quick-start.md): konfiguracja synchronicznej `App` i asynchronicznej `AsyncApp`.
- [Calling the API (Virtual Transport Layer)](../guide/virtual-transport-layer.md): parametry żądania, typy MIME,
  wywołania przez `google.script.run` i adres URL aplikacji internetowej, opakowywanie odpowiedzi.
- [Decorators](../guide/decorators.md): dekoratory klas, metod i parametrów, walidacja i wbudowane pipes.
- [Controlling the Response](../guide/responses.md): `ResponseEntity` i `@ResponseBody`.
- [Advanced Examples](../guide/examples.md): pipes i globalna obsługa błędów.
- [AI Agent Skills](../guide/ai-agent-skills.md): pełna lista skills i opcje instalacji.
- [Boot.gs vs Spring Boot vs NestJS](../comparison.md): porównanie architektur.

## Skills dla agentów AI

Pracujesz z agentem AI do programowania (Claude Code, Gemini CLI, Cursor itd.)? Repozytorium
**[bootgs/skills](https://github.com/bootgs/skills)** udostępnia Agent Skills, które uczą go generować szkielet
aplikacji **Boot.gs**, nadawać jej strukturę i ją walidować, a także skills niezależne od frameworka do pracy
z Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

Pełną listę oraz instalację dla Gemini CLI i `npx skills` znajdziesz w
[AI Agent Skills](../guide/ai-agent-skills.md).

## Polecane

> [!TIP]
> Aby wygodniej pracować z Google Apps Script, polecamy [@bootgs/utils](https://github.com/bootgs/utils) — zbiór
> funkcji i klas narzędziowych, które uzupełniają ten framework.

## Współtwórcy

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Jak pomóc w rozwoju

Zachęcamy do współtworzenia projektu! Zasady postępowania i proces zgłaszania pull requestów opisuje
[przewodnik dla współtwórców](../../CONTRIBUTING.md). Aby zgłosić podatność, postępuj zgodnie z
[polityką bezpieczeństwa](../../SECURITY.md).

## Plan rozwoju

Zajrzyj do [planu rozwoju](../../ROADMAP.md), aby zobaczyć, co planujemy w kolejnych wydaniach.

## Historia zmian

Szczegółowa lista zmian i aktualizacji znajduje się w [CHANGELOG](../../CHANGELOG.md).

## Wsparcie

Pytania i zgłoszenia błędów kieruj do [GitHub Issues](https://github.com/bootgs/boot/issues). Jeśli projekt Ci pomaga,
możesz go wesprzeć przez [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) lub
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Licencja

Ten projekt jest udostępniany na [licencji Apache-2.0](../../LICENSE).

---

<p align="center">
  ⭐ <b>Podoba Ci się ten projekt?</b> Daj mu gwiazdkę na <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
