<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Artiste : <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | **Français** | [Español](README.es.md) | [Português](README.pt.md) | [日本語](README.ja.md) | [中文](README.zh.md)

> Cette traduction a été réalisée avec l'aide de l'IA à partir de [README.md](README.md) pour la version 1.10.0. Le
> README anglais fait foi. Les corrections sont les bienvenues — voir [CONTRIBUTING.md](CONTRIBUTING.md).

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

**Boot.gs** est un framework léger qui aide à construire des applications Google Apps Script bien structurées. Il
apporte à l'environnement Apps Script des pratiques de développement familières, comme les décorateurs et l'injection de
dépendances, pour mieux organiser le code.

Vos contrôleurs restent indépendants de l'environnement : le même code traite les requêtes web `doGet`/`doPost`, les
appels `google.script.run` depuis les barres latérales et les boîtes de dialogue, ainsi que les événements Google
Workspace comme `onOpen` ou `onEdit`.

## Fonctionnalités

- **Routage par décorateurs** : association intuitive des événements HTTP et Apps Script (GET, POST, etc.).
- **Modèles de Spring Boot et NestJS** : des décorateurs familiers comme `@RequestMapping`, `@RestController`,
  `@ResponseBody`, et la classe `ResponseEntity`.
- **Réponses flexibles** : contrôle total des codes de statut HTTP, des en-têtes et des types MIME avec `ResponseEntity`.
- **Validation** : validation déclarative des paramètres avec des décorateurs à la Spring Boot comme `@Min`, `@Max`,
  `@Email`, etc.
- **Pipes et validation** : transformez et validez les données entrantes avec `@UsePipes` et les pipes intégrés (par
  exemple `ParseNumberPipe`).
- **Gestion globale des erreurs** : gestion centralisée des exceptions avec `@ControllerAdvice` et `@ExceptionHandler`.
- **Injection de dépendances** : une DI complète pour un meilleur découplage et une meilleure testabilité.
- **Sûreté du typage** : écrit en TypeScript pour un développement robuste.
- **Architecture moderne** : inspirée de frameworks comme NestJS et Spring Boot.

## Prérequis

- Un projet Google Apps Script sur l'environnement d'exécution V8, généralement géré en local avec [clasp](https://github.com/google/clasp).
- TypeScript avec `experimentalDecorators` et `emitDecoratorMetadata` activés dans `tsconfig.json`.
- Node.js `>=22.14.0` et npm pour l'installation et la compilation.

## Installation

Installez le framework via npm :

```bash
npm install bootgs
```

## Démarrage rapide

### 1. Définir un contrôleur

Créez une classe qui porte la logique de votre application. Les décorateurs associent les méthodes à des endpoints ou
à des événements précis.

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

### 2. Initialiser l'application

Créez une instance `App` et déléguez-lui les points d'entrée standard d'Apps Script, afin que le framework puisse
intercepter et router les événements entrants.

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

Le tutoriel complet, avec `doPost` et l'application asynchrone `AsyncApp`, se trouve dans le
[guide Quick Start](docs/guide/quick-start.md) (en anglais).

## Documentation

Les guides détaillés sont disponibles en anglais :

- [Quick Start](docs/guide/quick-start.md) : configuration de `App` (synchrone) et de `AsyncApp` (asynchrone).
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md) : paramètres de requête, types
  MIME, appels via `google.script.run` et l'URL de l'application web, encapsulation des réponses.
- [Decorators](docs/guide/decorators.md) : décorateurs de classe, de méthode et de paramètre, validation et pipes intégrés.
- [Controlling the Response](docs/guide/responses.md) : `ResponseEntity` et `@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md) : pipes et gestion globale des erreurs.
- [AI Agent Skills](docs/guide/ai-agent-skills.md) : liste complète des skills et options d'installation.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md) : comparaison des architectures.

## Skills pour agents IA

Vous travaillez avec un agent de code IA (Claude Code, Gemini CLI, Cursor, etc.) ? Le dépôt
**[bootgs/skills](https://github.com/bootgs/skills)** fournit des Agent Skills qui lui apprennent à générer, structurer
et valider des applications **Boot.gs**, ainsi que des skills génériques pour le développement Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

La liste complète et l'installation pour Gemini CLI et `npx skills` sont décrites dans
[AI Agent Skills](docs/guide/ai-agent-skills.md).

## Recommandé

> [!TIP]
> Pour un développement plus confortable avec Google Apps Script, nous recommandons [@bootgs/utils](https://github.com/bootgs/utils),
> une collection de fonctions et de classes utilitaires qui complètent ce framework.

## Contributeurs

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Contribuer

Les contributions sont les bienvenues ! Consultez le [guide de contribution](CONTRIBUTING.md) pour le code de conduite
et la procédure de soumission des pull requests. Pour signaler une vulnérabilité, suivez la
[politique de sécurité](SECURITY.md).

## Feuille de route

Consultez la [feuille de route](ROADMAP.md) pour voir ce qui est prévu dans les prochaines versions.

## Journal des modifications

La liste détaillée des changements et mises à jour se trouve dans le [CHANGELOG](CHANGELOG.md).

## Soutien

Questions et rapports de bugs : [GitHub Issues](https://github.com/bootgs/boot/issues). Si le projet vous est utile,
vous pouvez le soutenir via [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) ou
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Licence

Ce projet est distribué sous [licence Apache-2.0](LICENSE).

---

<p align="center">
  ⭐ <b>Le projet vous plaît ?</b> Donnez-lui une étoile sur <a href="https://github.com/bootgs/boot">GitHub</a> !
</p>
