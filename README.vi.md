<a name="top"></a>

![Project banner for Google Apps Script Boot Framework](docs/assets/images/banner-1280x640.JPG)

<p align="right">
    <small>
      <i>Nghệ sĩ: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-boot&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

[English](README.md) | [Українська](README.uk.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [Português](README.pt.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Polski](README.pl.md) | [Čeština](README.cs.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Bahasa Indonesia](README.id.md) | **Tiếng Việt** | [日本語](README.ja.md) | [한국어](README.ko.md) | [简体中文](README.zh.md) | [繁體中文](README.zh-TW.md)

> Bản dịch này được chuẩn bị với sự hỗ trợ của AI từ [README.md](README.md) cho phiên bản 1.10.0. README tiếng Anh là phiên bản tham chiếu. Mọi góp ý chỉnh sửa đều được hoan nghênh: xem [CONTRIBUTING.md](CONTRIBUTING.md).

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

## Giới thiệu

**Boot.gs** là một framework gọn nhẹ giúp xây dựng các ứng dụng Google Apps Script có cấu trúc rõ ràng. Framework mang
những mẫu phát triển quen thuộc như decorator và dependency injection vào môi trường Apps Script để giúp tổ chức mã
nguồn tốt hơn.

Các controller của bạn không phụ thuộc vào môi trường: cùng một đoạn mã xử lý các yêu cầu web `doGet`/`doPost`, các
lệnh gọi `google.script.run` từ thanh bên và hộp thoại, cũng như các sự kiện Google Workspace như `onOpen` hoặc `onEdit`.

## Tính năng

- **Định tuyến bằng decorator**: ánh xạ trực quan các sự kiện HTTP và Apps Script (GET, POST, v.v.).
- **Mẫu thiết kế của Spring Boot và NestJS**: các decorator quen thuộc như `@RequestMapping`, `@RestController`,
  `@ResponseBody` và lớp `ResponseEntity`.
- **Phản hồi linh hoạt**: toàn quyền kiểm soát mã trạng thái HTTP, header và kiểu MIME bằng `ResponseEntity`.
- **Xác thực dữ liệu**: xác thực tham số theo cách khai báo bằng các decorator kiểu Spring Boot như `@Min`, `@Max`,
  `@Email`, v.v.
- **Pipe và xác thực**: chuyển đổi và xác thực dữ liệu đầu vào với `@UsePipes` và các pipe dựng sẵn (ví dụ:
  `ParseNumberPipe`).
- **Xử lý lỗi toàn cục**: quản lý ngoại lệ tập trung với `@ControllerAdvice` và `@ExceptionHandler`.
- **Dependency Injection**: DI đầy đủ tính năng giúp giảm phụ thuộc giữa các thành phần và dễ kiểm thử hơn.
- **An toàn kiểu**: được viết bằng TypeScript cho trải nghiệm phát triển vững chắc.
- **Kiến trúc hiện đại**: lấy cảm hứng từ các framework như NestJS và Spring Boot.

## Yêu cầu

- Một dự án Google Apps Script chạy trên runtime V8, thường được quản lý cục bộ bằng [clasp](https://github.com/google/clasp).
- TypeScript với `experimentalDecorators` và `emitDecoratorMetadata` được bật trong `tsconfig.json`.
- Node.js `>=22.14.0` và npm để cài đặt và build.

## Cài đặt

Cài đặt framework qua npm:

```bash
npm install bootgs
```

## Bắt đầu nhanh

### 1. Định nghĩa controller

Tạo một lớp để xử lý logic của ứng dụng. Các decorator ánh xạ phương thức tới các endpoint hoặc sự kiện cụ thể.

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

### 2. Khởi tạo ứng dụng

Tạo một thể hiện `App` và chuyển giao các điểm vào tiêu chuẩn của Apps Script cho nó, để framework có thể chặn và định
tuyến các sự kiện đến.

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

Hướng dẫn đầy đủ, bao gồm `doPost` và ứng dụng bất đồng bộ `AsyncApp`, có trong
[hướng dẫn Quick Start](docs/guide/quick-start.md) (bằng tiếng Anh).

## Tài liệu

Các hướng dẫn chi tiết hiện có bằng tiếng Anh:

- [Quick Start](docs/guide/quick-start.md): thiết lập `App` (đồng bộ) và `AsyncApp` (bất đồng bộ).
- [Calling the API (Virtual Transport Layer)](docs/guide/virtual-transport-layer.md): tham số yêu cầu, kiểu MIME, lệnh
  gọi qua `google.script.run` và URL của Web App, bao gói phản hồi.
- [Decorators](docs/guide/decorators.md): decorator cho lớp, phương thức và tham số, xác thực và các pipe dựng sẵn.
- [Controlling the Response](docs/guide/responses.md): `ResponseEntity` và `@ResponseBody`.
- [Advanced Examples](docs/guide/examples.md): pipe và xử lý lỗi toàn cục.
- [AI Agent Skills](docs/guide/ai-agent-skills.md): danh sách đầy đủ các skill và các cách cài đặt.
- [Boot.gs vs Spring Boot vs NestJS](docs/comparison.md): so sánh kiến trúc.

## Skill cho tác tử AI

Bạn đang làm việc với một tác tử lập trình AI (Claude Code, Gemini CLI, Cursor, v.v.)? Kho mã
**[bootgs/skills](https://github.com/bootgs/skills)** cung cấp các Agent Skills hướng dẫn tác tử cách tạo khung, tổ
chức cấu trúc và kiểm tra các ứng dụng **Boot.gs**, cùng với các skill không phụ thuộc framework cho việc phát triển
Google Apps Script.

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
```

Danh sách đầy đủ và cách cài đặt cho Gemini CLI và `npx skills` có tại
[AI Agent Skills](docs/guide/ai-agent-skills.md).

## Đề xuất

> [!TIP]
> Để phát triển với Google Apps Script thuận tiện hơn, chúng tôi khuyên dùng [@bootgs/utils](https://github.com/bootgs/utils),
> một bộ sưu tập các hàm và lớp tiện ích bổ trợ cho framework này.

## Người đóng góp

<a href="https://github.com/felipepmdias"><img src="https://github.com/felipepmdias.png" width="50" height="50" style="border-radius: 50%;" alt="felipepmdias" /></a>
<a href="https://github.com/kosmo-ds"><img src="https://github.com/kosmo-ds.png" width="50" height="50" style="border-radius: 50%;" alt="kosmo-ds" /></a>

## Đóng góp

Chúng tôi luôn hoan nghênh các đóng góp! Vui lòng xem [hướng dẫn đóng góp](CONTRIBUTING.md) để biết về quy tắc ứng xử
và quy trình gửi pull request. Để báo cáo lỗ hổng bảo mật, hãy làm theo [chính sách bảo mật](SECURITY.md).

## Lộ trình

Xem [lộ trình](ROADMAP.md) để biết những gì đã được lên kế hoạch cho các phiên bản sắp tới.

## Nhật ký thay đổi

Danh sách chi tiết các thay đổi và cập nhật có trong [CHANGELOG](CHANGELOG.md).

## Hỗ trợ

Câu hỏi và báo cáo lỗi xin gửi tới [GitHub Issues](https://github.com/bootgs/boot/issues). Nếu dự án hữu ích với bạn,
bạn có thể ủng hộ qua [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov) hoặc
[Buy Me a Coffee](https://buymeacoffee.com/MaksymStoianov).

## Giấy phép

Dự án này được cấp phép theo [giấy phép Apache-2.0](LICENSE).

---

<p align="center">
  ⭐ <b>Bạn thích dự án này?</b> Hãy tặng một ngôi sao trên <a href="https://github.com/bootgs/boot">GitHub</a>!
</p>
