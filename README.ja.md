<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>アーティスト: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | **日本語** | [中文](README.zh.md)

> この翻訳は、バージョン 1.10.0 の [README.md](README.md) をもとに AI の支援を受けて作成されました。正式な内容は英語版の README です。修正の提案を歓迎します。詳しくは [CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。

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

## はじめに

**Boot.gs** は、構造化された Google Apps Script アプリケーションを構築するための軽量フレームワークです。デコレーターや依存性注入といったおなじみの開発パターンを Apps Script 環境に持ち込み、コードを整理しやすくします。

コントローラーは実行環境に依存しません。同じコードで `doGet`/`doPost` の Web リクエスト、サイドバーやダイアログからの `google.script.run` 呼び出し、`onOpen` や `onEdit` などの Google Workspace イベントを処理できます。

## 機能

- **デコレーターによるルーティング**: HTTP と Apps Script のイベント（GET、POST など）を直感的にマッピング。
- **Spring Boot と NestJS のパターン**: `@RequestMapping`、`@RestController`、`@ResponseBody` などのおなじみのデコレーターと `ResponseEntity` クラス。
- **柔軟なレスポンス**: `ResponseEntity` で HTTP ステータスコード、ヘッダー、MIME タイプを完全に制御。
- **バリデーション**: `@Min`、`@Max`、`@Email` など Spring Boot 風のデコレーターによる宣言的なパラメーター検証。
- **Pipes とバリデーション**: `@UsePipes` と組み込みの pipes（例: `ParseNumberPipe`）で入力データを変換・検証。
- **グローバルなエラー処理**: `@ControllerAdvice` と `@ExceptionHandler` による例外の一元管理。
- **依存性注入**: 疎結合でテストしやすいコードのための本格的な DI。
- **型安全**: TypeScript で書かれており、堅牢な開発体験を提供。
- **モダンなアーキテクチャ**: NestJS や Spring Boot などのフレームワークに着想を得た設計。

## 動作要件

- V8 ランタイムの Google Apps Script プロジェクト（通常は [clasp](https://github.com/google/clasp) でローカル管理）。
- `tsconfig.json` で `experimentalDecorators` と `emitDecoratorMetadata` を有効にした TypeScript。
- インストールとビルド用の Node.js `>=22.14.0` と npm。

## インストール

npm でフレームワークをインストールします。

```bash
npm install bootgs
```

## クイックスタート

### 1. コントローラーを定義する

アプリケーションのロジックを担うクラスを作成します。デコレーターでメソッドを特定のエンドポイントやイベントに対応付けます。

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

### 2. アプリケーションを初期化する

`App` のインスタンスを作成し、Apps Script の標準エントリーポイントを委譲します。これにより、フレームワークが受信したイベントを受け取ってルーティングできるようになります。

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

`doPost` や非同期の `AsyncApp` を含む完全な手順は、[Quick Start ガイド](docs/guide/quick-start.md)（英語）をご覧ください。

## ドキュメント

詳細なガイドは英語で提供されています。

- [Quick Start](docs/guide/quick-start.md): 同期 `App` と非同期 `AsyncApp` のセットアップ。
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): リクエストパラメーター、MIME タイプ、`google.script.run` と Web アプリ URL からの呼び出し、レスポンスのラップ。
- [Decorators](docs/guide/decorators.md): クラス・メソッド・パラメーターのデコレーター、バリデーション、組み込み pipes。
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity` と `@ResponseBody`。
- [Advanced Examples](docs/guide/examples.md): pipes とグローバルなエラー処理。
- [AI Agent Skills](docs/guide/ai-agent-skills.md): スキルの一覧とインストール方法。
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): アーキテクチャの比較。

## AI エージェント向けスキル

AI コーディングエージェント（Claude Code、Gemini CLI、Cursor など）を使っていますか？**[bootgs/skills](https://github.com/bootgs/skills)** リポジトリでは、**Boot.gs** アプリケーションの雛形作成、構成、検証をエージェントに教える Agent Skills と、Google Apps Script 開発全般に使えるフレームワーク非依存のスキルを提供しています。

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

スキルの一覧と、Gemini CLI や `npx skills` でのインストール方法は [AI Agent Skills](docs/guide/ai-agent-skills.md) をご覧ください。

## おすすめ

> [!TIP]
> Google Apps Script での開発をより快適にするために、このフレームワークを補完するユーティリティ関数とクラスのコレクション [apps-script-utils](https://github.com/MaksymStoianov/apps-script-utils) をおすすめします。

## コントリビューター

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## コントリビューション

コントリビューションを歓迎します！行動規範とプルリクエストの手順については [コントリビューションガイド](CONTRIBUTING.md) をご覧ください。脆弱性の報告は [セキュリティポリシー](SECURITY.md) に従ってください。

## ロードマップ

今後のリリース予定は [ロードマップ](ROADMAP.md) をご覧ください。

## 変更履歴

変更点と更新内容の詳細は [CHANGELOG](CHANGELOG.md) を参照してください。

## サポート

質問やバグ報告は [GitHub Issues](https://github.com/bootgs/boot/issues) へどうぞ。プロジェクトが役に立った場合は、[GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) または [Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov) で支援していただけます。

## ライセンス

このプロジェクトは [Apache-2.0 ライセンス](LICENSE) の下で公開されています。

---

<p align="center">
  ⭐ <b>このプロジェクトが気に入りましたか？</b> <a href="https://github.com/bootgs/boot">GitHub</a> でスターをお願いします！
</p>
