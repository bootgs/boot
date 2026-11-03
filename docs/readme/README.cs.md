<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](../assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Umělkyně: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | **Čeština** | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Tento překlad byl připraven s pomocí AI z [README.md](../../README.md) pro verzi 1.10.0. Referenční verzí je anglické README. Opravy jsou vítány: viz [CONTRIBUTING.md](../../CONTRIBUTING.md).

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

## Úvod

**Boot.gs** je odlehčený framework pro tvorbu dobře strukturovaných aplikací v Google Apps Script. Přináší do prostředí
Apps Script známé vývojové vzory, jako jsou dekorátory a vkládání závislostí (dependency injection), a pomáhá tak lépe
organizovat kód.

Vaše controllery nezávisí na prostředí: stejný kód obslouží webové požadavky `doGet`/`doPost`, volání
`google.script.run` z postranních panelů a dialogů i události Google Workspace, jako je `onOpen` nebo `onEdit`.

## Funkce

- **Směrování pomocí dekorátorů**: intuitivní mapování událostí HTTP a Apps Script (GET, POST atd.).
- **Vzory ze Spring Boot a NestJS**: známé dekorátory jako `@RequestMapping`, `@RestController`, `@ResponseBody`
  a třída `ResponseEntity`.
- **Flexibilní odpovědi**: plná kontrola nad stavovými kódy HTTP, hlavičkami a typy MIME pomocí `ResponseEntity`.
- **Validace**: deklarativní validace parametrů pomocí dekorátorů ve stylu Spring Boot, jako jsou `@Min`, `@Max`,
  `@Email` atd.
- **Pipes a validace**: transformace a validace příchozích dat pomocí `@UsePipes` a vestavěných pipes (např.
  `ParseNumberPipe`).
- **Globální zpracování chyb**: centralizovaná správa výjimek pomocí `@ControllerAdvice` a `@ExceptionHandler`.
- **Vkládání závislostí**: plnohodnotné DI pro volnější vazby a snazší testování.
- **Typová bezpečnost**: napsáno v TypeScriptu pro spolehlivý vývoj.
- **Moderní architektura**: inspirováno frameworky jako NestJS a Spring Boot.

## Požadavky

- Projekt Google Apps Script s běhovým prostředím V8, obvykle spravovaný lokálně pomocí [clasp](https://github.com/google/clasp).
- TypeScript se zapnutými volbami `experimentalDecorators` a `emitDecoratorMetadata` v `tsconfig.json`.
- Node.js `>=22.14.0` a npm pro instalaci a sestavení.

## Instalace

Nainstalujte framework přes npm:

```bash
npm install bootgs
```

## Rychlý start

### 1. Definujte controller

Vytvořte třídu s logikou vaší aplikace. Dekorátory mapují metody na konkrétní endpointy nebo události.

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

### 2. Inicializujte aplikaci

Vytvořte instanci `App` a předejte jí standardní vstupní body Apps Script, aby framework mohl zachytávat a směrovat
příchozí události.

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

Kompletní postup včetně `doPost` a asynchronní aplikace `AsyncApp` najdete v
[průvodci Quick Start](../guide/quick-start.md) (v angličtině).

## Dokumentace

Podrobné průvodce jsou k dispozici v angličtině:

- [Quick Start](../guide/quick-start.md): nastavení synchronní `App` a asynchronní `AsyncApp`.
- [Calling the API (Virtual Transport Layer)](../guide/virtual-transport-layer.md): parametry požadavku, typy MIME,
  volání přes `google.script.run` a URL webové aplikace, obalování odpovědí.
- [Decorators](../guide/decorators.md): dekorátory tříd, metod a parametrů, validace a vestavěné pipes.
- [Controlling the Response](../guide/responses.md): `ResponseEntity` a `@ResponseBody`.
- [Advanced Examples](../guide/examples.md): pipes a globální zpracování chyb.
- [AI Agent Skills](../guide/ai-agent-skills.md): úplný seznam skills a možnosti instalace.
- [Boot.gs vs Spring Boot vs NestJS](../comparison.md): srovnání architektur.

## Skills pro AI agenty

Pracujete s AI agentem pro programování (Claude Code, Gemini CLI, Cursor atd.)? Repozitář
**[bootgs/skills](https://github.com/bootgs/skills)** nabízí Agent Skills, které ho naučí vytvářet kostru, strukturovat
a validovat aplikace **Boot.gs**, a navíc obecné skills pro vývoj v Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

Úplný seznam a instalaci pro Gemini CLI a `npx skills` najdete v [AI Agent Skills](../guide/ai-agent-skills.md).

## Doporučujeme

> [!TIP]
> Pro pohodlnější vývoj v Google Apps Script doporučujeme [@bootgs/utils](https://github.com/bootgs/utils),
> kolekci pomocných funkcí a tříd, které tento framework doplňují.

## Přispěvatelé

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Jak přispět

Příspěvky jsou vítány! Pravidla chování a postup při odesílání pull requestů najdete v
[pokynech pro přispěvatele](../../CONTRIBUTING.md). Chcete-li nahlásit zranitelnost, postupujte podle
[bezpečnostní politiky](../../SECURITY.md).

## Plán vývoje

V [plánu vývoje](../../ROADMAP.md) zjistíte, co chystáme v příštích verzích.

## Seznam změn

Podrobný seznam změn a aktualizací najdete v [CHANGELOG](../../CHANGELOG.md).

## Podpora

Dotazy a hlášení chyb patří do [GitHub Issues](https://github.com/bootgs/boot/issues). Pokud vám projekt pomáhá,
můžete ho podpořit přes [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) nebo
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Licence

Tento projekt je licencován pod [licencí Apache-2.0](../../LICENSE).

---

<p align="center">
  ⭐ <b>Líbí se vám tento projekt?</b> Dejte mu hvězdičku na <a href="https://github.com/bootgs/boot">GitHubu</a>!
</p>
