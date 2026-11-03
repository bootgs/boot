<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](../assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Kunstenaar: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | **Nederlands** | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Deze vertaling is met behulp van AI gemaakt op basis van [README.md](../../README.md) voor versie 1.10.0. De Engelse README is de referentieversie. Correcties zijn welkom: zie [CONTRIBUTING.md](../../CONTRIBUTING.md).

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

## Introductie

**Boot.gs** is een lichtgewicht framework voor het bouwen van goed gestructureerde Google Apps Script-applicaties. Het
brengt vertrouwde ontwikkelpatronen, zoals decorators en dependency injection, naar de Apps Script-omgeving zodat je je
code beter kunt organiseren.

Je controllers blijven onafhankelijk van de omgeving: dezelfde code verwerkt `doGet`/`doPost`-webverzoeken,
`google.script.run`-aanroepen vanuit zijbalken en dialoogvensters, en Google Workspace-events zoals `onOpen` of `onEdit`.

## Functies

- **Routing met decorators**: intuïtieve koppeling van HTTP- en Apps Script-events (GET, POST, enz.).
- **Patronen uit Spring Boot en NestJS**: vertrouwde decorators zoals `@RequestMapping`, `@RestController`,
  `@ResponseBody` en de klasse `ResponseEntity`.
- **Flexibele responses**: volledige controle over HTTP-statuscodes, headers en MIME-typen met `ResponseEntity`.
- **Validatie**: declaratieve validatie van parameters met decorators in Spring Boot-stijl, zoals `@Min`, `@Max`,
  `@Email`, enz.
- **Pipes en validatie**: transformeer en valideer binnenkomende gegevens met `@UsePipes` en ingebouwde pipes
  (bijvoorbeeld `ParseNumberPipe`).
- **Globale foutafhandeling**: centraal beheer van exceptions met `@ControllerAdvice` en `@ExceptionHandler`.
- **Dependency injection**: volwaardige DI voor betere ontkoppeling en testbaarheid.
- **Typeveiligheid**: geschreven in TypeScript voor een robuuste ontwikkelervaring.
- **Moderne architectuur**: geïnspireerd door frameworks als NestJS en Spring Boot.

## Vereisten

- Een Google Apps Script-project op de V8-runtime, meestal lokaal beheerd met [clasp](https://github.com/google/clasp).
- TypeScript met `experimentalDecorators` en `emitDecoratorMetadata` ingeschakeld in `tsconfig.json`.
- Node.js `>=22.14.0` en npm voor installeren en bouwen.

## Installatie

Installeer het framework via npm:

```bash
npm install bootgs
```

## Snel aan de slag

### 1. Definieer een controller

Maak een klasse die de logica van je applicatie afhandelt. Decorators koppelen methoden aan specifieke endpoints of
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

### 2. Initialiseer de applicatie

Maak een `App`-instantie aan en delegeer de standaard entrypoints van Apps Script daaraan, zodat het framework
binnenkomende events kan onderscheppen en routeren.

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

De volledige uitleg, inclusief `doPost` en de asynchrone `AsyncApp`, staat in de
[Quick Start-gids](../guide/quick-start.md) (in het Engels).

## Documentatie

De uitgebreide handleidingen zijn beschikbaar in het Engels:

- [Quick Start](../guide/quick-start.md): opzet van de synchrone `App` en de asynchrone `AsyncApp`.
- [Calling the API (Virtual Transport Layer)](../guide/virtual-transport-layer.md): verzoekparameters, MIME-typen,
  aanroepen via `google.script.run` en de URL van de web-app, het verpakken van responses.
- [Decorators](../guide/decorators.md): decorators voor klassen, methoden en parameters, validatie en ingebouwde pipes.
- [Controlling the Response](../guide/responses.md): `ResponseEntity` en `@ResponseBody`.
- [Advanced Examples](../guide/examples.md): pipes en globale foutafhandeling.
- [AI Agent Skills](../guide/ai-agent-skills.md): de volledige lijst met skills en installatieopties.
- [Boot.gs vs Spring Boot vs NestJS](../comparison.md): vergelijking van de architecturen.

## Skills voor AI-agents

Werk je met een AI-codeeragent (Claude Code, Gemini CLI, Cursor, enz.)? De repository
**[bootgs/skills](https://github.com/bootgs/skills)** biedt Agent Skills die de agent leren hoe hij **Boot.gs**-applicaties
opzet, structureert en valideert, plus framework-onafhankelijke skills voor ontwikkeling met Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

De volledige lijst en de installatie voor Gemini CLI en `npx skills` vind je in
[AI Agent Skills](../guide/ai-agent-skills.md).

## Aanbevolen

> [!TIP]
> Voor prettiger ontwikkelen met Google Apps Script raden we [@bootgs/utils](https://github.com/bootgs/utils) aan, een
> verzameling hulpfuncties en -klassen die dit framework aanvullen.

## Bijdragers

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Bijdragen

Bijdragen zijn van harte welkom! Lees de [richtlijnen voor bijdragers](../../CONTRIBUTING.md) voor de gedragscode en de
werkwijze voor het indienen van pull requests. Volg het [beveiligingsbeleid](../../SECURITY.md) om een kwetsbaarheid te
melden.

## Roadmap

Bekijk de [roadmap](../../ROADMAP.md) om te zien wat er voor toekomstige releases gepland staat.

## Changelog

Een gedetailleerde lijst met wijzigingen en updates vind je in de [CHANGELOG](../../CHANGELOG.md).

## Ondersteuning

Vragen en bugmeldingen horen thuis in [GitHub Issues](https://github.com/bootgs/boot/issues). Heb je iets aan het
project, dan kun je het steunen via [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) of
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Licentie

Dit project valt onder de [Apache-2.0-licentie](../../LICENSE).

---

<p align="center">
  ⭐ <b>Vind je dit project goed?</b> Geef het een ster op <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
