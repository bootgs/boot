<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>아티스트: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | **한국어** | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> 이 번역은 버전 1.10.0의 [README.md](README.md)를 바탕으로 AI의 도움을 받아 작성되었습니다. 기준이 되는 버전은 영어 README입니다. 수정 제안을 환영합니다. 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

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

## 소개

**Boot.gs**는 체계적인 구조의 Google Apps Script 애플리케이션을 만들 수 있도록 돕는 경량 프레임워크입니다. 데코레이터와 의존성 주입 같은 익숙한 개발 패턴을 Apps Script 환경에 도입하여 코드를 깔끔하게 정리할 수 있게 해 줍니다.

컨트롤러는 실행 환경에 의존하지 않습니다. 동일한 코드로 `doGet`/`doPost` 웹 요청, 사이드바와 대화상자에서 보내는 `google.script.run` 호출, `onOpen`이나 `onEdit` 같은 Google Workspace 이벤트를 모두 처리할 수 있습니다.

## 기능

- **데코레이터 기반 라우팅**: HTTP 및 Apps Script 이벤트(GET, POST 등)를 직관적으로 매핑합니다.
- **Spring Boot 및 NestJS 패턴**: `@RequestMapping`, `@RestController`, `@ResponseBody` 같은 익숙한 데코레이터와 `ResponseEntity` 클래스를 제공합니다.
- **유연한 응답**: `ResponseEntity`로 HTTP 상태 코드, 헤더, MIME 타입을 완전히 제어할 수 있습니다.
- **유효성 검사**: `@Min`, `@Max`, `@Email` 등 Spring Boot 스타일의 데코레이터로 매개변수를 선언적으로 검증합니다.
- **파이프와 유효성 검사**: `@UsePipes`와 내장 파이프(예: `ParseNumberPipe`)로 들어오는 데이터를 변환하고 검증합니다.
- **전역 오류 처리**: `@ControllerAdvice`와 `@ExceptionHandler`로 예외를 한곳에서 관리합니다.
- **의존성 주입**: 결합도를 낮추고 테스트하기 쉽게 만들어 주는 완전한 기능의 DI를 제공합니다.
- **타입 안전성**: TypeScript로 작성되어 견고한 개발 경험을 제공합니다.
- **현대적인 아키텍처**: NestJS와 Spring Boot 같은 프레임워크에서 영감을 받았습니다.

## 요구 사항

- V8 런타임을 사용하는 Google Apps Script 프로젝트(보통 [clasp](https://github.com/google/clasp)로 로컬에서 관리).
- `tsconfig.json`에서 `experimentalDecorators`와 `emitDecoratorMetadata`를 활성화한 TypeScript.
- 설치와 빌드를 위한 Node.js `>=22.14.0` 및 npm.

## 설치

npm으로 프레임워크를 설치합니다.

```bash
npm install bootgs
```

## 빠른 시작

### 1. 컨트롤러 정의하기

애플리케이션의 로직을 처리할 클래스를 만듭니다. 데코레이터가 메서드를 특정 엔드포인트나 이벤트에 연결합니다.

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

### 2. 애플리케이션 초기화하기

`App` 인스턴스를 만들고 Apps Script의 표준 진입점을 이 인스턴스에 위임하면, 프레임워크가 들어오는 이벤트를 가로채 라우팅할 수 있습니다.

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

`doPost`와 비동기 `AsyncApp`을 포함한 전체 안내는 [Quick Start 가이드](docs/guide/quick-start.md)(영어)에서 확인할 수 있습니다.

## 문서

자세한 가이드는 영어로 제공됩니다.

- [Quick Start](docs/guide/quick-start.md): 동기 `App`과 비동기 `AsyncApp` 설정.
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): 요청 매개변수, MIME 타입, `google.script.run` 및 웹 앱 URL을 통한 호출, 응답 래핑.
- [Decorators](docs/guide/decorators.md): 클래스, 메서드, 매개변수 데코레이터, 유효성 검사와 내장 파이프.
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity`와 `@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md): 파이프와 전역 오류 처리.
- [AI Agent Skills](docs/guide/ai-agent-skills.md): 전체 스킬 목록과 설치 방법.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): 아키텍처 비교.

## AI 에이전트용 스킬

AI 코딩 에이전트(Claude Code, Gemini CLI, Cursor 등)를 사용하고 계신가요? **[bootgs/skills](https://github.com/bootgs/skills)** 저장소는 **Boot.gs** 애플리케이션의 뼈대를 만들고, 구조를 잡고, 검증하는 방법을 에이전트에게 알려 주는 Agent Skills와 함께, 프레임워크와 무관하게 Google Apps Script 개발에 쓸 수 있는 스킬도 제공합니다.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

전체 목록과 Gemini CLI 및 `npx skills`를 이용한 설치 방법은 [AI Agent Skills](docs/guide/ai-agent-skills.md)를 참고하세요.

## 추천

> [!TIP]
> Google Apps Script 개발을 더욱 편리하게 하려면 이 프레임워크를 보완하는 유틸리티 함수와 클래스 모음인 [@bootgs/utils](https://github.com/bootgs/utils)를 함께 사용하는 것을 권장합니다.

## 기여자

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## 기여하기

기여를 환영합니다! 행동 강령과 풀 리퀘스트 제출 절차는 [기여 가이드](CONTRIBUTING.md)를 참고하세요. 취약점을 신고하려면 [보안 정책](SECURITY.md)을 따라 주세요.

## 로드맵

향후 릴리스 계획은 [로드맵](ROADMAP.md)에서 확인하세요.

## 변경 이력

변경 사항과 업데이트의 자세한 목록은 [CHANGELOG](CHANGELOG.md)를 참고하세요.

## 지원

질문과 버그 신고는 [GitHub Issues](https://github.com/bootgs/boot/issues)에 남겨 주세요. 프로젝트가 도움이 되었다면 [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) 또는 [Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov)로 후원하실 수 있습니다.

## 라이선스

이 프로젝트는 [Apache-2.0 라이선스](LICENSE)에 따라 배포됩니다.

---

<p align="center">
  ⭐ <b>이 프로젝트가 마음에 드시나요?</b> <a href="https://github.com/bootgs/boot">GitHub</a>에서 스타를 눌러 주세요!
</p>
