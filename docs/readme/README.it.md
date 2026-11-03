<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](../assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Artista: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | **Italiano** | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Questa traduzione è stata preparata con l'aiuto dell'IA a partire da [README.md](../../README.md) per la versione 1.10.0. Il README in inglese è la versione di riferimento. Le correzioni sono benvenute: consulta [CONTRIBUTING.md](../../CONTRIBUTING.md).

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

## Introduzione

**Boot.gs** è un framework leggero pensato per creare applicazioni Google Apps Script ben strutturate. Porta
nell'ambiente Apps Script pattern di sviluppo familiari, come i decoratori e la dependency injection, per organizzare
meglio il codice.

I tuoi controller restano indipendenti dall'ambiente: lo stesso codice gestisce le richieste web `doGet`/`doPost`, le
chiamate `google.script.run` da barre laterali e finestre di dialogo e gli eventi di Google Workspace come `onOpen` o
`onEdit`.

## Funzionalità

- **Routing basato su decoratori**: mappatura intuitiva degli eventi HTTP e di Apps Script (GET, POST, ecc.).
- **Pattern di Spring Boot e NestJS**: decoratori familiari come `@RequestMapping`, `@RestController`, `@ResponseBody` e
  la classe `ResponseEntity`.
- **Risposte flessibili**: pieno controllo su codici di stato HTTP, header e tipi MIME tramite `ResponseEntity`.
- **Validazione**: validazione dichiarativa dei parametri con decoratori in stile Spring Boot come `@Min`, `@Max`,
  `@Email`, ecc.
- **Pipe e validazione**: trasforma e valida i dati in ingresso con `@UsePipes` e le pipe integrate (ad esempio
  `ParseNumberPipe`).
- **Gestione globale degli errori**: gestione centralizzata delle eccezioni con `@ControllerAdvice` e
  `@ExceptionHandler`.
- **Dependency injection**: DI completa per un migliore disaccoppiamento e una maggiore testabilità.
- **Sicurezza dei tipi**: scritto in TypeScript per un'esperienza di sviluppo solida.
- **Architettura moderna**: ispirata a framework come NestJS e Spring Boot.

## Requisiti

- Un progetto Google Apps Script sul runtime V8, di solito gestito in locale con [clasp](https://github.com/google/clasp).
- TypeScript con `experimentalDecorators` ed `emitDecoratorMetadata` abilitati in `tsconfig.json`.
- Node.js `>=22.14.0` e npm per l'installazione e la build.

## Installazione

Installa il framework tramite npm:

```bash
npm install bootgs
```

## Guida rapida

### 1. Definisci un controller

Crea una classe che gestisca la logica della tua applicazione. I decoratori associano i metodi a endpoint o eventi
specifici.

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

### 2. Inizializza l'applicazione

Crea un'istanza di `App` e delega a essa i punti di ingresso standard di Apps Script, così che il framework possa
intercettare e instradare gli eventi in arrivo.

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

La procedura completa, inclusi `doPost` e l'applicazione asincrona `AsyncApp`, è nella
[guida Quick Start](../guide/quick-start.md) (in inglese).

## Documentazione

Le guide dettagliate sono disponibili in inglese:

- [Quick Start](../guide/quick-start.md): configurazione di `App` (sincrona) e `AsyncApp` (asincrona).
- [Calling the API (Virtual Transport Layer)](../guide/virtual-transport-layer.md): parametri della richiesta, tipi
  MIME, chiamate tramite `google.script.run` e l'URL della web app, incapsulamento delle risposte.
- [Decorators](../guide/decorators.md): decoratori di classe, metodo e parametro, validazione e pipe integrate.
- [Controlling the Response](../guide/responses.md): `ResponseEntity` e `@ResponseBody`.
- [Advanced Examples](../guide/examples.md): pipe e gestione globale degli errori.
- [AI Agent Skills](../guide/ai-agent-skills.md): elenco completo delle skill e opzioni di installazione.
- [Boot.gs vs Spring Boot vs NestJS](../comparison.md): confronto tra le architetture.

## Skill per agenti IA

Lavori con un agente di programmazione basato sull'IA (Claude Code, Gemini CLI, Cursor, ecc.)? Il repository
**[bootgs/skills](https://github.com/bootgs/skills)** offre Agent Skills che gli insegnano a creare lo scheletro,
strutturare e validare applicazioni **Boot.gs**, oltre a skill generiche per lo sviluppo con Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

L'elenco completo e l'installazione per Gemini CLI e `npx skills` sono in
[AI Agent Skills](../guide/ai-agent-skills.md).

## Consigliato

> [!TIP]
> Per sviluppare con Google Apps Script in modo più comodo, consigliamo [@bootgs/utils](https://github.com/bootgs/utils),
> una raccolta di funzioni e classi di utilità che completano questo framework.

## Collaboratori

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Come contribuire

I contributi sono benvenuti! Consulta le [linee guida per i contributi](../../CONTRIBUTING.md) per il codice di condotta e
la procedura per inviare pull request. Per segnalare una vulnerabilità, segui la
[politica di sicurezza](../../SECURITY.md).

## Roadmap

Consulta la [roadmap](../../ROADMAP.md) per vedere cosa è previsto nelle prossime versioni.

## Registro delle modifiche

L'elenco dettagliato delle modifiche e degli aggiornamenti è nel [CHANGELOG](../../CHANGELOG.md).

## Supporto

Domande e segnalazioni di bug vanno su [GitHub Issues](https://github.com/bootgs/boot/issues). Se il progetto ti è
utile, puoi sostenerlo tramite [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) o
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Licenza

Questo progetto è distribuito con [licenza Apache-2.0](../../LICENSE).

---

<p align="center">
  ⭐ <b>Ti piace il progetto?</b> Lasciagli una stella su <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
