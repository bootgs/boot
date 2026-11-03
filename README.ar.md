<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>الفنانة: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | **العربية** | [Bahasa Indonesia](README.id.md) | [Tiếng Việt](README.vi.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

<div dir="rtl" lang="ar">

> أُعدّت هذه الترجمة بمساعدة الذكاء الاصطناعي انطلاقًا من [README.md](README.md) للإصدار 1.10.0. ملف README الإنجليزي هو النسخة المرجعية. نرحّب بالتصحيحات: راجع [CONTRIBUTING.md](CONTRIBUTING.md).

# Boot Framework for Google Apps Script™

</div>

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

<div dir="rtl" lang="ar">

## مقدمة

**Boot.gs** إطار عمل خفيف يساعد على بناء تطبيقات Google Apps Script منظّمة. يهدف إلى نقل أنماط تطوير مألوفة، مثل
المزخرفات (decorators) وحقن التبعيات، إلى بيئة Apps Script لتسهيل تنظيم الشيفرة.

تبقى المتحكّمات لديك مستقلة عن البيئة: الشيفرة نفسها تعالج طلبات الويب `doGet`/`doPost`، واستدعاءات
`google.script.run` من الأشرطة الجانبية ومربعات الحوار، وأحداث Google Workspace مثل `onOpen` أو `onEdit`.

## الميزات

- **توجيه قائم على المزخرفات**: ربط بديهي لأحداث HTTP وأحداث Apps Script (GET وPOST وغيرها).
- **أنماط Spring Boot وNestJS**: مزخرفات مألوفة مثل `@RequestMapping` و`@RestController` و`@ResponseBody`، والفئة
  `ResponseEntity`.
- **استجابات مرنة**: تحكّم كامل في رموز حالة HTTP والترويسات وأنواع MIME باستخدام `ResponseEntity`.
- **التحقق**: تحقق تصريحي من المعاملات بمزخرفات على طريقة Spring Boot مثل `@Min` و`@Max` و`@Email` وغيرها.
- **الأنابيب (Pipes) والتحقق**: حوّل البيانات الواردة وتحقّق منها باستخدام `@UsePipes` والأنابيب المدمجة (مثل
  `ParseNumberPipe`).
- **معالجة شاملة للأخطاء**: إدارة مركزية للاستثناءات باستخدام `@ControllerAdvice` و`@ExceptionHandler`.
- **حقن التبعيات**: حقن تبعيات (DI) متكامل لفصل أفضل بين المكوّنات وسهولة أكبر في الاختبار.
- **أمان الأنواع**: مكتوب بلغة TypeScript لتجربة تطوير متينة.
- **بنية حديثة**: مستوحاة من أطر عمل مثل NestJS وSpring Boot.

## المتطلبات

- مشروع Google Apps Script يعمل على بيئة التشغيل V8، ويُدار عادةً محليًا باستخدام [clasp](https://github.com/google/clasp).
- TypeScript مع تفعيل `experimentalDecorators` و`emitDecoratorMetadata` في `tsconfig.json`.
- Node.js `>=22.14.0` وnpm للتثبيت والبناء.

## التثبيت

ثبّت إطار العمل عبر npm:

</div>

```bash
npm install bootgs
```

<div dir="rtl" lang="ar">

## البدء السريع

### 1. عرّف متحكّمًا

أنشئ فئة تتولى منطق تطبيقك. تربط المزخرفات التوابع بنقاط نهاية أو أحداث محددة.

</div>

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

<div dir="rtl" lang="ar">

### 2. هيّئ التطبيق

أنشئ مثيلًا من `App` وفوّض إليه نقاط الدخول القياسية في Apps Script، كي يتمكن إطار العمل من اعتراض الأحداث الواردة
وتوجيهها.

</div>

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

<div dir="rtl" lang="ar">

الشرح الكامل، بما في ذلك `doPost` والتطبيق غير المتزامن `AsyncApp`، موجود في
[دليل Quick Start](docs/guide/quick-start.md) (بالإنجليزية).

## التوثيق

الأدلة التفصيلية متاحة باللغة الإنجليزية:

- [Quick Start](docs/guide/quick-start.md): إعداد `App` (متزامن) و`AsyncApp` (غير متزامن).
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): معاملات الطلب، وأنواع MIME،
  والاستدعاء عبر `google.script.run` وعنوان URL لتطبيق الويب، وتغليف الاستجابات.
- [Decorators](docs/guide/decorators.md): مزخرفات الفئات والتوابع والمعاملات، والتحقق، والأنابيب المدمجة.
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity` و`@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md): الأنابيب والمعالجة الشاملة للأخطاء.
- [AI Agent Skills](docs/guide/ai-agent-skills.md): القائمة الكاملة للمهارات وخيارات التثبيت.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): مقارنة بين البنى المعمارية.

## مهارات وكلاء الذكاء الاصطناعي

هل تعمل مع وكيل برمجة بالذكاء الاصطناعي (Claude Code أو Gemini CLI أو Cursor وغيرها)؟ يقدّم المستودع
**[bootgs/skills](https://github.com/bootgs/skills)** مهارات وكلاء (Agent Skills) تعلّمه كيفية إنشاء الهيكل الأولي
لتطبيقات **Boot.gs** وتنظيمها والتحقق منها، إضافةً إلى مهارات عامة لتطوير Google Apps Script لا ترتبط بإطار عمل بعينه.

</div>

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

<div dir="rtl" lang="ar">

القائمة الكاملة وطريقة التثبيت عبر Gemini CLI و`npx skills` موجودة في [AI Agent Skills](docs/guide/ai-agent-skills.md).

## موصى به

> [!TIP]
> لتطوير أكثر راحة في Google Apps Script، نوصي باستخدام [@bootgs/utils](https://github.com/bootgs/utils)، وهي مجموعة
> من الدوال والفئات المساعدة التي تكمّل إطار العمل هذا.

## المساهمون

</div>

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

<div dir="rtl" lang="ar">

## المساهمة

نرحّب بالمساهمات! راجع [إرشادات المساهمة](CONTRIBUTING.md) للاطلاع على قواعد السلوك وطريقة إرسال طلبات الدمج
(pull requests). للإبلاغ عن ثغرة أمنية، اتبع [سياسة الأمان](SECURITY.md).

## خارطة الطريق

اطّلع على [خارطة الطريق](ROADMAP.md) لمعرفة ما نخطط له في الإصدارات القادمة.

## سجل التغييرات

للاطلاع على قائمة مفصّلة بالتغييرات والتحديثات، راجع [CHANGELOG](CHANGELOG.md).

## الدعم

تُرسل الأسئلة وتقارير الأخطاء إلى [GitHub Issues](https://github.com/bootgs/boot/issues). إذا كان المشروع مفيدًا لك،
يمكنك دعمه عبر [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) أو
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## الترخيص

هذا المشروع مرخّص بموجب [ترخيص Apache-2.0](LICENSE).

---

<p align="center">
  ⭐ <b>هل أعجبك المشروع؟</b> امنحه نجمة على <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>

</div>
