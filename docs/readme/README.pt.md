<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](../assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Artista: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](../../README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | **Português** | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Esta tradução foi feita com ajuda de IA a partir do [README.md](../../README.md) para a versão 1.10.0. O README em inglês é
> a versão oficial. Correções são bem-vindas — veja o [CONTRIBUTING.md](../../CONTRIBUTING.md).

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

## Introdução

**Boot.gs** é um framework leve feito para ajudar a criar aplicações Google Apps Script bem estruturadas. Ele traz para
o ambiente do Apps Script padrões de desenvolvimento conhecidos, como decorators e injeção de dependência, para
organizar melhor o código.

Seus controllers não dependem do ambiente: o mesmo código atende requisições web `doGet`/`doPost`, chamadas
`google.script.run` a partir de barras laterais e caixas de diálogo, e eventos do Google Workspace como `onOpen` ou
`onEdit`.

## Recursos

- **Roteamento com decorators**: mapeamento intuitivo de eventos HTTP e do Apps Script (GET, POST etc.).
- **Padrões do Spring Boot e do NestJS**: decorators conhecidos como `@RequestMapping`, `@RestController`,
  `@ResponseBody` e a classe `ResponseEntity`.
- **Respostas flexíveis**: controle total de códigos de status HTTP, cabeçalhos e tipos MIME com `ResponseEntity`.
- **Validação**: validação declarativa de parâmetros com decorators no estilo Spring Boot, como `@Min`, `@Max`,
  `@Email` etc.
- **Pipes e validação**: transforme e valide os dados de entrada com `@UsePipes` e pipes nativos (por exemplo,
  `ParseNumberPipe`).
- **Tratamento global de erros**: gerenciamento centralizado de exceções com `@ControllerAdvice` e `@ExceptionHandler`.
- **Injeção de dependência**: DI completa para melhor desacoplamento e testabilidade.
- **Segurança de tipos**: escrito em TypeScript para um desenvolvimento robusto.
- **Arquitetura moderna**: inspirada em frameworks como NestJS e Spring Boot.

## Requisitos

- Um projeto Google Apps Script no runtime V8, normalmente gerenciado localmente com [clasp](https://github.com/google/clasp).
- TypeScript com `experimentalDecorators` e `emitDecoratorMetadata` ativados no `tsconfig.json`.
- Node.js `>=22.14.0` e npm para instalar e fazer o build.

## Instalação

Instale o framework via npm:

```bash
npm install bootgs
```

## Início rápido

### 1. Defina um controller

Crie uma classe com a lógica da sua aplicação. Os decorators mapeiam métodos para endpoints ou eventos específicos.

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

### 2. Inicialize a aplicação

Crie uma instância de `App` e delegue a ela os pontos de entrada padrão do Apps Script, para que o framework possa
interceptar e rotear os eventos recebidos.

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

O passo a passo completo, incluindo `doPost` e a aplicação assíncrona `AsyncApp`, está no
[guia Quick Start](../guide/quick-start.md) (em inglês).

## Documentação

Os guias detalhados estão disponíveis em inglês:

- [Quick Start](../guide/quick-start.md): configuração do `App` (síncrono) e do `AsyncApp` (assíncrono).
- [Calling the API (Virtual Transport Layer)](../guide/virtual-transport-layer.md): parâmetros da requisição, tipos
  MIME, chamadas via `google.script.run` e pela URL do app da web, empacotamento das respostas.
- [Decorators](../guide/decorators.md): decorators de classe, método e parâmetro, validação e pipes nativos.
- [Controlling the Response](../guide/responses.md): `ResponseEntity` e `@ResponseBody`.
- [Advanced Examples](../guide/examples.md): pipes e tratamento global de erros.
- [AI Agent Skills](../guide/ai-agent-skills.md): lista completa de skills e opções de instalação.
- [Boot.gs vs Spring Boot vs NestJS](../comparison.md): comparação de arquiteturas.

## Skills para agentes de IA

Trabalha com um agente de programação com IA (Claude Code, Gemini CLI, Cursor etc.)? O repositório
**[bootgs/skills](https://github.com/bootgs/skills)** oferece Agent Skills que ensinam o agente a criar a estrutura
inicial, organizar e validar aplicações **Boot.gs**, além de skills genéricas para desenvolvimento em Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

A lista completa e a instalação para Gemini CLI e `npx skills` estão em
[AI Agent Skills](../guide/ai-agent-skills.md).

## Recomendado

> [!TIP]
> Para desenvolver com mais conforto no Google Apps Script, recomendamos o [@bootgs/utils](https://github.com/bootgs/utils),
> uma coleção de funções e classes utilitárias que complementam este framework.

## Contribuidores

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Como contribuir

Contribuições são bem-vindas! Veja o [guia de contribuição](../../CONTRIBUTING.md) para conhecer o código de conduta e o
processo de envio de pull requests. Para relatar uma vulnerabilidade, siga a [política de segurança](../../SECURITY.md).

## Roadmap

Confira o [roadmap](../../ROADMAP.md) para ver o que está planejado para as próximas versões.

## Changelog

A lista detalhada de mudanças e atualizações está no [CHANGELOG](../../CHANGELOG.md).

## Apoio

Dúvidas e relatos de bugs vão para o [GitHub Issues](https://github.com/bootgs/boot/issues). Se o projeto for útil
para você, apoie-o pelo [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) ou pelo
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Licença

Este projeto é licenciado sob a [Licença Apache-2.0](../../LICENSE).

---

<p align="center">
  ⭐ <b>Gostou do projeto?</b> Deixe uma estrela no <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
