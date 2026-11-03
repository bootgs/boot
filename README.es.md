<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Artista: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | **Español** | [Português](README.pt.md) | [日本語](README.ja.md) | [中文](README.zh.md)

> Esta traducción se preparó con ayuda de IA a partir de [README.md](README.md) para la versión 1.10.0. La versión en
> inglés del README es la de referencia. Las correcciones son bienvenidas: consulta [CONTRIBUTING.md](CONTRIBUTING.md).

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

## Introducción

**Boot.gs** es un framework ligero pensado para crear aplicaciones de Google Apps Script bien estructuradas. Lleva al
entorno de Apps Script patrones de desarrollo conocidos, como los decoradores y la inyección de dependencias, para
organizar mejor el código.

Tus controladores no dependen del entorno: el mismo código atiende las peticiones web `doGet`/`doPost`, las llamadas
`google.script.run` desde barras laterales y diálogos, y los eventos de Google Workspace como `onOpen` u `onEdit`.

## Características

- **Enrutamiento con decoradores**: asignación intuitiva de eventos HTTP y de Apps Script (GET, POST, etc.).
- **Patrones de Spring Boot y NestJS**: decoradores conocidos como `@RequestMapping`, `@RestController`,
  `@ResponseBody` y la clase `ResponseEntity`.
- **Respuestas flexibles**: control total de códigos de estado HTTP, cabeceras y tipos MIME con `ResponseEntity`.
- **Validación**: validación declarativa de parámetros con decoradores al estilo de Spring Boot como `@Min`, `@Max`,
  `@Email`, etc.
- **Pipes y validación**: transforma y valida los datos de entrada con `@UsePipes` y pipes integrados (por ejemplo,
  `ParseNumberPipe`).
- **Gestión global de errores**: manejo centralizado de excepciones con `@ControllerAdvice` y `@ExceptionHandler`.
- **Inyección de dependencias**: DI completa para un mejor desacoplamiento y facilidad de prueba.
- **Seguridad de tipos**: escrito en TypeScript para un desarrollo robusto.
- **Arquitectura moderna**: inspirada en frameworks como NestJS y Spring Boot.

## Requisitos

- Un proyecto de Google Apps Script con el entorno de ejecución V8, normalmente gestionado en local con [clasp](https://github.com/google/clasp).
- TypeScript con `experimentalDecorators` y `emitDecoratorMetadata` activados en `tsconfig.json`.
- Node.js `>=22.14.0` y npm para instalar y compilar.

## Instalación

Instala el framework con npm:

```bash
npm install bootgs
```

## Inicio rápido

### 1. Define un controlador

Crea una clase con la lógica de tu aplicación. Los decoradores asignan los métodos a endpoints o eventos concretos.

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

### 2. Inicializa la aplicación

Crea una instancia de `App` y delega en ella los puntos de entrada estándar de Apps Script, para que el framework pueda
interceptar y enrutar los eventos entrantes.

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

El recorrido completo, incluidos `doPost` y la aplicación asíncrona `AsyncApp`, está en la
[guía Quick Start](docs/guide/quick-start.md) (en inglés).

## Documentación

Las guías detalladas están disponibles en inglés:

- [Quick Start](docs/guide/quick-start.md): configuración de `App` (síncrona) y `AsyncApp` (asíncrona).
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): parámetros de la petición, tipos
  MIME, llamadas mediante `google.script.run` y la URL de la aplicación web, envoltura de respuestas.
- [Decorators](docs/guide/decorators.md): decoradores de clase, método y parámetro, validación y pipes integrados.
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity` y `@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md): pipes y gestión global de errores.
- [AI Agent Skills](docs/guide/ai-agent-skills.md): lista completa de skills y opciones de instalación.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): comparación de arquitecturas.

## Skills para agentes de IA

¿Trabajas con un agente de programación con IA (Claude Code, Gemini CLI, Cursor, etc.)? El repositorio
**[bootgs/skills](https://github.com/bootgs/skills)** ofrece Agent Skills que le enseñan a crear el esqueleto,
estructurar y validar aplicaciones **Boot.gs**, además de skills genéricas para el desarrollo con Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

La lista completa y la instalación para Gemini CLI y `npx skills` están en
[AI Agent Skills](docs/guide/ai-agent-skills.md).

## Recomendado

> [!TIP]
> Para desarrollar con más comodidad en Google Apps Script, recomendamos [@bootgs/utils](https://github.com/bootgs/utils),
> una colección de funciones y clases utilitarias que complementan este framework.

## Colaboradores

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Cómo contribuir

¡Las contribuciones son bienvenidas! Consulta la [guía de contribución](CONTRIBUTING.md) para conocer el código de
conducta y el proceso para enviar pull requests. Para informar de una vulnerabilidad, sigue la
[política de seguridad](SECURITY.md).

## Hoja de ruta

Consulta la [hoja de ruta](ROADMAP.md) para ver lo que está previsto en las próximas versiones.

## Registro de cambios

La lista detallada de cambios y actualizaciones está en el [CHANGELOG](CHANGELOG.md).

## Apoyo

Las preguntas y los informes de errores van a [GitHub Issues](https://github.com/bootgs/boot/issues). Si el proyecto
te resulta útil, puedes apoyarlo a través de [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) o
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Licencia

Este proyecto se distribuye bajo la [licencia Apache-2.0](LICENSE).

---

<p align="center">
  ⭐ <b>¿Te gusta el proyecto?</b> Dale una estrella en <a href="https://github.com/bootgs/boot">GitHub</a>.
</p>
