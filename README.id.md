<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Seniman: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | **Bahasa Indonesia** | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Terjemahan ini disiapkan dengan bantuan AI dari [README.md](README.md) untuk versi 1.10.0. README berbahasa Inggris adalah versi acuan. Koreksi sangat kami harapkan: lihat [CONTRIBUTING.md](CONTRIBUTING.md).

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

## Pendahuluan

**Boot.gs** adalah framework ringan untuk membangun aplikasi Google Apps Script yang terstruktur. Framework ini
menghadirkan pola pengembangan yang sudah dikenal, seperti dekorator dan dependency injection, ke lingkungan Apps
Script agar kode lebih tertata.

Controller Anda tidak bergantung pada lingkungan: kode yang sama menangani permintaan web `doGet`/`doPost`, panggilan
`google.script.run` dari sidebar dan dialog, serta event Google Workspace seperti `onOpen` atau `onEdit`.

## Fitur

- **Routing berbasis dekorator**: pemetaan intuitif untuk event HTTP dan Apps Script (GET, POST, dan lainnya).
- **Pola Spring Boot dan NestJS**: dekorator yang sudah dikenal seperti `@RequestMapping`, `@RestController`,
  `@ResponseBody`, serta kelas `ResponseEntity`.
- **Respons yang fleksibel**: kendali penuh atas kode status HTTP, header, dan tipe MIME dengan `ResponseEntity`.
- **Validasi**: validasi parameter secara deklaratif dengan dekorator bergaya Spring Boot seperti `@Min`, `@Max`,
  `@Email`, dan lainnya.
- **Pipe dan validasi**: ubah dan validasi data masuk dengan `@UsePipes` dan pipe bawaan (misalnya `ParseNumberPipe`).
- **Penanganan error global**: pengelolaan exception terpusat dengan `@ControllerAdvice` dan `@ExceptionHandler`.
- **Dependency injection**: DI lengkap untuk decoupling yang lebih baik dan kode yang lebih mudah diuji.
- **Keamanan tipe**: ditulis dengan TypeScript untuk pengalaman pengembangan yang andal.
- **Arsitektur modern**: terinspirasi oleh framework seperti NestJS dan Spring Boot.

## Persyaratan

- Proyek Google Apps Script dengan runtime V8, biasanya dikelola secara lokal dengan [clasp](https://github.com/google/clasp).
- TypeScript dengan `experimentalDecorators` dan `emitDecoratorMetadata` diaktifkan di `tsconfig.json`.
- Node.js `>=22.14.0` dan npm untuk instalasi dan build.

## Instalasi

Instal framework melalui npm:

```bash
npm install bootgs
```

## Mulai cepat

### 1. Definisikan controller

Buat kelas yang menangani logika aplikasi Anda. Dekorator memetakan method ke endpoint atau event tertentu.

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

### 2. Inisialisasi aplikasi

Buat instance `App` dan teruskan titik masuk standar Apps Script kepadanya, agar framework dapat mencegat dan
merutekan event yang masuk.

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

Panduan lengkapnya, termasuk `doPost` dan aplikasi asinkron `AsyncApp`, ada di
[panduan Quick Start](docs/guide/quick-start.md) (dalam bahasa Inggris).

## Dokumentasi

Panduan terperinci tersedia dalam bahasa Inggris:

- [Quick Start](docs/guide/quick-start.md): penyiapan `App` (sinkron) dan `AsyncApp` (asinkron).
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): parameter permintaan, tipe MIME,
  panggilan melalui `google.script.run` dan URL Web App, pembungkusan respons.
- [Decorators](docs/guide/decorators.md): dekorator kelas, method, dan parameter, validasi, serta pipe bawaan.
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity` dan `@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md): pipe dan penanganan error global.
- [AI Agent Skills](docs/guide/ai-agent-skills.md): daftar lengkap skill dan opsi instalasi.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): perbandingan arsitektur.

## Skill untuk agen AI

Bekerja dengan agen pemrograman AI (Claude Code, Gemini CLI, Cursor, dan lainnya)? Repositori
**[bootgs/skills](https://github.com/bootgs/skills)** menyediakan Agent Skills yang mengajarinya cara membuat kerangka,
menyusun, dan memvalidasi aplikasi **Boot.gs**, ditambah skill umum untuk pengembangan Google Apps Script yang tidak
terikat pada framework tertentu.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

Daftar lengkap serta instalasi untuk Gemini CLI dan `npx skills` ada di [AI Agent Skills](docs/guide/ai-agent-skills.md).

## Rekomendasi

> [!TIP]
> Untuk pengembangan Google Apps Script yang lebih nyaman, kami merekomendasikan [@bootgs/utils](https://github.com/bootgs/utils),
> kumpulan fungsi dan kelas utilitas yang melengkapi framework ini.

## Kontributor

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Berkontribusi

Kontribusi sangat kami sambut! Lihat [panduan kontribusi](CONTRIBUTING.md) untuk mengetahui kode etik dan proses
pengajuan pull request. Untuk melaporkan kerentanan, ikuti [kebijakan keamanan](SECURITY.md).

## Peta jalan

Lihat [peta jalan](ROADMAP.md) untuk mengetahui apa yang direncanakan pada rilis mendatang.

## Catatan perubahan

Daftar perubahan dan pembaruan secara terperinci ada di [CHANGELOG](CHANGELOG.md).

## Dukungan

Pertanyaan dan laporan bug dapat diajukan di [GitHub Issues](https://github.com/bootgs/boot/issues). Jika proyek ini
bermanfaat bagi Anda, Anda dapat mendukungnya melalui [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov)
atau [Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Lisensi

Proyek ini dilisensikan di bawah [lisensi Apache-2.0](LICENSE).

---

<p align="center">
  ⭐ <b>Suka dengan proyek ini?</b> Beri bintang di <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
