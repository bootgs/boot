<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Künstlerin: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | **Deutsch** | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Diese Übersetzung wurde mit KI-Unterstützung aus [README.md](README.md) für Version 1.10.0 erstellt. Maßgeblich ist
> die englische README. Korrekturen sind willkommen — siehe [CONTRIBUTING.md](CONTRIBUTING.md).

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

## Einführung

**Boot.gs** ist ein schlankes Framework für strukturierte Google-Apps-Script-Anwendungen. Es bringt vertraute
Entwicklungsmuster wie Decorators und Dependency Injection in die Apps-Script-Umgebung und hilft so, den Code sauber zu
organisieren.

Controller bleiben unabhängig von der Umgebung: Derselbe Code verarbeitet `doGet`/`doPost`-Webanfragen,
`google.script.run`-Aufrufe aus Seitenleisten und Dialogen sowie Google-Workspace-Ereignisse wie `onOpen` oder `onEdit`.

## Funktionen

- **Decorator-basiertes Routing**: Intuitive Zuordnung von HTTP- und Apps-Script-Ereignissen (GET, POST usw.).
- **Muster aus Spring Boot und NestJS**: Vertraute Decorators wie `@RequestMapping`, `@RestController`, `@ResponseBody`
  und die Klasse `ResponseEntity`.
- **Flexible Antworten**: Volle Kontrolle über HTTP-Statuscodes, Header und MIME-Typen mit `ResponseEntity`.
- **Validierung**: Deklarative Parametervalidierung mit Decorators im Spring-Boot-Stil wie `@Min`, `@Max`, `@Email`
  usw.
- **Pipes und Validierung**: Eingehende Daten mit `@UsePipes` und eingebauten Pipes (z. B. `ParseNumberPipe`)
  umwandeln und prüfen.
- **Globale Fehlerbehandlung**: Zentrales Exception-Management mit `@ControllerAdvice` und `@ExceptionHandler`.
- **Dependency Injection**: Vollwertige DI für lose Kopplung und gute Testbarkeit.
- **Typsicherheit**: In TypeScript geschrieben für eine robuste Entwicklung.
- **Moderne Architektur**: Inspiriert von Frameworks wie NestJS und Spring Boot.

## Voraussetzungen

- Ein Google-Apps-Script-Projekt mit der V8-Laufzeit, in der Regel lokal mit [clasp](https://github.com/google/clasp) verwaltet.
- TypeScript mit aktivierten Optionen `experimentalDecorators` und `emitDecoratorMetadata` in `tsconfig.json`.
- Node.js `>=22.14.0` und npm für Installation und Build.

## Installation

Installieren Sie das Framework über npm:

```bash
npm install bootgs
```

## Schnellstart

### 1. Controller definieren

Legen Sie eine Klasse für die Logik Ihrer Anwendung an. Decorators ordnen Methoden bestimmten Endpunkten oder
Ereignissen zu.

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

### 2. Anwendung initialisieren

Erstellen Sie eine `App`-Instanz und delegieren Sie die Standard-Einstiegspunkte von Apps Script an sie, damit das
Framework eingehende Ereignisse abfangen und weiterleiten kann.

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

Die vollständige Anleitung, auch mit `doPost` und der asynchronen `AsyncApp`, finden Sie im
[Quick-Start-Leitfaden](docs/guide/quick-start.md) (auf Englisch).

## Dokumentation

Die ausführlichen Leitfäden sind auf Englisch verfügbar:

- [Quick Start](docs/guide/quick-start.md): Einrichtung der synchronen `App` und der asynchronen `AsyncApp`.
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): Anfrageparameter, MIME-Typen,
  Aufrufe über `google.script.run` und die Web-App-URL, Antwort-Wrapping.
- [Decorators](docs/guide/decorators.md): Klassen-, Methoden- und Parameter-Decorators, Validierung und eingebaute Pipes.
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity` und `@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md): Pipes und globale Fehlerbehandlung.
- [AI Agent Skills](docs/guide/ai-agent-skills.md): vollständige Liste der Skills und Installationsoptionen.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): Architekturvergleich.

## Skills für KI-Agenten

Sie arbeiten mit einem KI-Coding-Agenten (Claude Code, Gemini CLI, Cursor usw.)? Das Repository
**[bootgs/skills](https://github.com/bootgs/skills)** stellt Agent Skills bereit, die ihm beibringen, **Boot.gs**-Anwendungen
anzulegen, zu strukturieren und zu validieren, dazu frameworkunabhängige Skills für die Google-Apps-Script-Entwicklung.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

Die vollständige Liste und die Installation für Gemini CLI und `npx skills` finden Sie unter
[AI Agent Skills](docs/guide/ai-agent-skills.md).

## Empfehlung

> [!TIP]
> Für komfortablere Entwicklung mit Google Apps Script empfehlen wir [@bootgs/utils](https://github.com/bootgs/utils),
> eine Sammlung von Hilfsfunktionen und Klassen, die dieses Framework ergänzen.

## Mitwirkende

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Mitwirken

Beiträge sind willkommen! Verhaltenskodex und Ablauf für Pull Requests beschreiben die
[Richtlinien für Beitragende](CONTRIBUTING.md). Sicherheitslücken melden Sie bitte gemäß der
[Sicherheitsrichtlinie](SECURITY.md).

## Roadmap

In der [Roadmap](ROADMAP.md) sehen Sie, was für kommende Releases geplant ist.

## Änderungsprotokoll

Eine ausführliche Liste der Änderungen und Updates finden Sie im [CHANGELOG](CHANGELOG.md).

## Unterstützung

Fragen und Fehlerberichte gehören in die [GitHub Issues](https://github.com/bootgs/boot/issues). Wenn Ihnen das Projekt
hilft, können Sie es über [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) oder
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov) unterstützen.

## Lizenz

Dieses Projekt steht unter der [Apache-2.0-Lizenz](LICENSE).

---

<p align="center">
  ⭐ <b>Gefällt Ihnen das Projekt?</b> Geben Sie ihm einen Stern auf <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
