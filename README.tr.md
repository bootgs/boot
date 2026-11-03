<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Sanatçı: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | **Türkçe** | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Bu çeviri, 1.10.0 sürümü için [README.md](README.md) dosyasından yapay zekâ desteğiyle hazırlanmıştır. Referans sürüm İngilizce README'dir. Düzeltmelerinizi bekliyoruz: [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın.

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

## Giriş

**Boot.gs**, iyi yapılandırılmış Google Apps Script uygulamaları geliştirmeye yardımcı olmak için tasarlanmış hafif bir
framework'tür. Kodun daha düzenli olması için dekoratörler ve bağımlılık enjeksiyonu gibi tanıdık geliştirme
kalıplarını Apps Script ortamına taşır.

Controller'larınız ortamdan bağımsız kalır: aynı kod `doGet`/`doPost` web isteklerini, kenar çubukları ve
iletişim kutularından gelen `google.script.run` çağrılarını ve `onOpen` ya da `onEdit` gibi Google Workspace
olaylarını işler.

## Özellikler

- **Dekoratör tabanlı yönlendirme**: HTTP ve Apps Script olaylarının (GET, POST vb.) sezgisel eşlenmesi.
- **Spring Boot ve NestJS kalıpları**: `@RequestMapping`, `@RestController`, `@ResponseBody` gibi tanıdık dekoratörler
  ve `ResponseEntity` sınıfı.
- **Esnek yanıtlar**: `ResponseEntity` ile HTTP durum kodları, başlıklar ve MIME türleri üzerinde tam denetim.
- **Doğrulama**: `@Min`, `@Max`, `@Email` gibi Spring Boot tarzı dekoratörlerle bildirime dayalı parametre doğrulama.
- **Pipe'lar ve doğrulama**: Gelen verileri `@UsePipes` ve yerleşik pipe'larla (örneğin `ParseNumberPipe`) dönüştürün
  ve doğrulayın.
- **Genel hata yönetimi**: `@ControllerAdvice` ve `@ExceptionHandler` ile merkezi istisna yönetimi.
- **Bağımlılık enjeksiyonu**: Daha gevşek bağlılık ve daha kolay test edilebilirlik için tam özellikli DI.
- **Tür güvenliği**: Sağlam bir geliştirme deneyimi için TypeScript ile yazılmıştır.
- **Modern mimari**: NestJS ve Spring Boot gibi framework'lerden esinlenmiştir.

## Gereksinimler

- V8 çalışma zamanını kullanan, genellikle [clasp](https://github.com/google/clasp) ile yerelde yönetilen bir Google Apps Script projesi.
- `tsconfig.json` içinde `experimentalDecorators` ve `emitDecoratorMetadata` seçenekleri etkinleştirilmiş TypeScript.
- Kurulum ve derleme için Node.js `>=22.14.0` ve npm.

## Kurulum

Framework'ü npm ile kurun:

```bash
npm install bootgs
```

## Hızlı başlangıç

### 1. Bir controller tanımlayın

Uygulamanızın mantığını işleyecek bir sınıf oluşturun. Dekoratörler, metotları belirli endpoint'lere veya olaylara
eşler.

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

### 2. Uygulamayı başlatın

Bir `App` örneği oluşturun ve standart Apps Script giriş noktalarını ona devredin; böylece framework gelen olayları
yakalayıp yönlendirebilir.

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

`doPost` ve asenkron `AsyncApp` dahil olmak üzere adım adım anlatımın tamamı
[Quick Start kılavuzunda](docs/guide/quick-start.md) (İngilizce) yer alır.

## Dokümantasyon

Ayrıntılı kılavuzlar İngilizce olarak mevcuttur:

- [Quick Start](docs/guide/quick-start.md): senkron `App` ve asenkron `AsyncApp` kurulumu.
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): istek parametreleri, MIME
  türleri, `google.script.run` ve Web App URL'si üzerinden çağrılar, yanıtların sarmalanması.
- [Decorators](docs/guide/decorators.md): sınıf, metot ve parametre dekoratörleri, doğrulama ve yerleşik pipe'lar.
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity` ve `@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md): pipe'lar ve genel hata yönetimi.
- [AI Agent Skills](docs/guide/ai-agent-skills.md): skill'lerin tam listesi ve kurulum seçenekleri.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): mimari karşılaştırması.

## Yapay zekâ ajanları için skill'ler

Bir yapay zekâ kodlama ajanıyla (Claude Code, Gemini CLI, Cursor vb.) mı çalışıyorsunuz?
**[bootgs/skills](https://github.com/bootgs/skills)** deposu, ajana **Boot.gs** uygulamalarının iskeletini oluşturmayı,
yapılandırmayı ve doğrulamayı öğreten Agent Skills'in yanı sıra Google Apps Script geliştirmesi için framework'ten
bağımsız skill'ler sunar.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

Tam liste ile Gemini CLI ve `npx skills` üzerinden kurulum için [AI Agent Skills](docs/guide/ai-agent-skills.md)
sayfasına bakın.

## Önerilenler

> [!TIP]
> Google Apps Script ile daha rahat geliştirme için bu framework'ü tamamlayan yardımcı fonksiyon ve sınıflardan oluşan
> [@bootgs/utils](https://github.com/bootgs/utils) koleksiyonunu kullanmanızı öneririz.

## Katkıda bulunanlar

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Katkıda bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Davranış kuralları ve pull request gönderme süreci hakkında ayrıntılar için
[katkı kılavuzumuza](CONTRIBUTING.md) bakın. Bir güvenlik açığı bildirmek için [güvenlik politikasını](SECURITY.md)
izleyin.

## Yol haritası

Gelecek sürümlerde neler planladığımızı görmek için [yol haritamıza](ROADMAP.md) göz atın.

## Değişiklik günlüğü

Değişikliklerin ve güncellemelerin ayrıntılı listesi için [CHANGELOG](CHANGELOG.md) dosyasına bakın.

## Destek

Sorular ve hata bildirimleri için [GitHub Issues](https://github.com/bootgs/boot/issues) kullanılır. Proje işinize
yarıyorsa onu [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) veya
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov) üzerinden destekleyebilirsiniz.

## Lisans

Bu proje [Apache-2.0 lisansı](LICENSE) ile lisanslanmıştır.

---

<p align="center">
  ⭐ <b>Projeyi beğendiniz mi?</b> <a href="https://github.com/bootgs/boot">GitHub</a>'da ona bir yıldız verin!
</p>
