# Changelog

## [1.9.0](https://github.com/bootgs/boot/compare/v1.8.0...v1.9.0) (2026-04-15)


### Features

* **core:** core logic and service improvements ([00e6e0c](https://github.com/bootgs/boot/commit/00e6e0c13244b82d36c4322737510352dc4ca693))
* **core:** introduce ResponseEntity, ResponseBody and produces support ([b13fb1b](https://github.com/bootgs/boot/commit/b13fb1b61fa3b91dd9ffa57525ebc8ec1768e05e))
* **service:** add support for Apps Script output types in ResponseBuilder and cleanup ([db2f912](https://github.com/bootgs/boot/commit/db2f912550963e5516cfd41336784dc42d10aae7))

## [1.8.0](https://github.com/bootgs/boot/compare/v1.7.1...v1.8.0) (2026-04-14)


### Features

* **core:** update services, decorators and repository logic ([bd1ba46](https://github.com/bootgs/boot/commit/bd1ba46eb7dc8189acec0ef2761459fe35bf5e4a))
* **domain:** update domain entities, types and enums ([e81d5ce](https://github.com/bootgs/boot/commit/e81d5ce5b9048f4824be66ab3f0cc8b0ac19d344))

## [1.7.1](https://github.com/bootgs/boot/compare/v1.7.0...v1.7.1) (2026-04-12)


### Bug Fixes

* readme ([80bc9aa](https://github.com/bootgs/boot/commit/80bc9aaa5d4c00c6fb947b4e2c4831fda7a63c94))
* readme ([39c4d81](https://github.com/bootgs/boot/commit/39c4d8113af9c2a1fb72d0b448b94af82993b786))

## [1.7.0](https://github.com/bootgs/boot/compare/v1.6.0...v1.7.0) (2026-04-12)


### Features

* **core:** add Guards and Pipes for security and validation ([eb757dd](https://github.com/bootgs/boot/commit/eb757dd45c6d75f3e426cf38ed830011929fdf9d))
* **core:** add onMenu method to BootApplication for Google Apps Script menu handling ([0dbd1a9](https://github.com/bootgs/boot/commit/0dbd1a9dc9351fea0e37dfa118315b86aa8e40af))
* **core:** implement Spring Boot style decorators and global error handling ([280945d](https://github.com/bootgs/boot/commit/280945d7794c87432507e45b3a0d924152593733))
* **core:** update BootApplication and core services ([72aadd8](https://github.com/bootgs/boot/commit/72aadd855544534f1fabca794c5b00ae7ef97e3a))
* **domain:** add ApplicationProperties and update ApplicationConfig ([2a5e16c](https://github.com/bootgs/boot/commit/2a5e16ca2d7d6037f179141c08b03ce47a69291d))
* **pipes:** add new pipes and refactor existing ones ([05721b5](https://github.com/bootgs/boot/commit/05721b500d999b87b79a6d7a259781b6c0a9a2a3))
* Refactor utils and add createApp alias ([c4ac82f](https://github.com/bootgs/boot/commit/c4ac82fed83df22816c9d065e1ac7028aedce5e9))
* restructure controllers and services ([2ebad08](https://github.com/bootgs/boot/commit/2ebad08d59d065177073af68b284dc710e27d4d6))
* restructure domain models and exceptions ([484e5eb](https://github.com/bootgs/boot/commit/484e5ebf8cee74384b91da85c46ddeb90a41fe0f))
* restructure repositories and shared utilities ([2e8c043](https://github.com/bootgs/boot/commit/2e8c043acc07d4e6eb0b3430c26a1083c650eb79))
* update core logic to use apps-script-utils and refactor ([faea336](https://github.com/bootgs/boot/commit/faea3366624fcf945279d23f81def83c492b29f2))
* **validation:** add validation decorators and pipes ([5d04bea](https://github.com/bootgs/boot/commit/5d04bea91b7f5c6a34958a3f8a854b6fe672b892))


### Bug Fixes

* add .github/FUNDING.yml ([dd0c80d](https://github.com/bootgs/boot/commit/dd0c80dfa183001b62cfcd40a1709282b52c5f7c))
* add import reflect-metadata ([923ee31](https://github.com/bootgs/boot/commit/923ee3191a4415b3e0b69dab97b59bce889f2492))
* add import reflect-metadata ([f6a8b7e](https://github.com/bootgs/boot/commit/f6a8b7ecd395a0b0eecffad52978910cf26528b2))
* **BootApplication:** read apiPrefix directly from config instead of config.config ([3293c1b](https://github.com/bootgs/boot/commit/3293c1b2edcbc393757c98bd9a8abda72b9a3fb6))
* bugs ([ee0cde5](https://github.com/bootgs/boot/commit/ee0cde5ce8bb63776ec91c951e9152c482eb1c18))
* change onMenu to a getter returning a Proxy ([8623bf3](https://github.com/bootgs/boot/commit/8623bf339fae58e916122e431f3360d115d26cc4))
* controllers ([17fcdb4](https://github.com/bootgs/boot/commit/17fcdb415ee0e7cec98976ff7b0dd6270b78cf02))
* controllers ([79339ae](https://github.com/bootgs/boot/commit/79339ae8109af400ed2e1eb3580f2d2f2cb1946a))
* **core:** improve pipe handling and API prefix logic ([a5aeb03](https://github.com/bootgs/boot/commit/a5aeb03a64eda57681992f2f1cbf3dbbe2fbc2ee))
* Critical bug preventing dependency injection ([a62b212](https://github.com/bootgs/boot/commit/a62b212376ef6909f6c2e83fd291096b6a5a5bb7))
* format ([f5e8896](https://github.com/bootgs/boot/commit/f5e8896ab75a861abe02cccf4739c23d529a1bb5))
* format ([b16e6b7](https://github.com/bootgs/boot/commit/b16e6b71330ab34d6e8520f75e47ff1d00a06d0f))
* imports ([c525656](https://github.com/bootgs/boot/commit/c5256565d84c6cd53aa36dd1312d7880044af84a))
* lint ([794c1b7](https://github.com/bootgs/boot/commit/794c1b760aac01e7124c8561d44f42fef69fdf91))
* lint ([9ece0d8](https://github.com/bootgs/boot/commit/9ece0d8733025d82ba75baf0489001c37776b511))
* **readme:** fix link in README.md ([938931f](https://github.com/bootgs/boot/commit/938931f39fd3646f2d5b17345d503dd27a6601e3))
* **test:** add eslint-disable for unused-vars in ValidationDecorators ([4015355](https://github.com/bootgs/boot/commit/401535511e819d2deb1a8204138cd76effbdc7c3))
* update apps-script-utils to v1.9.0 ([c74766f](https://github.com/bootgs/boot/commit/c74766f8965bd83987f9c2534ace9f8148686079))
* update apps-script-utils to v1.9.0 ([41f2a20](https://github.com/bootgs/boot/commit/41f2a20d9ef8c28b2b803152c5de9114d1685478))
* update package.json ([ece9d69](https://github.com/bootgs/boot/commit/ece9d691d0ba1a8871da7198a1e9d7a8539842c5))
* update package.json ([83c9a45](https://github.com/bootgs/boot/commit/83c9a4506d74fc3e9132d98ee8c2298a7ecf660d))

## [1.6.0](https://github.com/bootgs/boot/compare/v1.5.1...v1.6.0) (2026-04-12)


### Features

* **core:** add Guards and Pipes for security and validation ([eb757dd](https://github.com/bootgs/boot/commit/eb757dd45c6d75f3e426cf38ed830011929fdf9d))
* **core:** implement Spring Boot style decorators and global error handling ([280945d](https://github.com/bootgs/boot/commit/280945d7794c87432507e45b3a0d924152593733))
* **core:** update BootApplication and core services ([72aadd8](https://github.com/bootgs/boot/commit/72aadd855544534f1fabca794c5b00ae7ef97e3a))
* **domain:** add ApplicationProperties and update ApplicationConfig ([2a5e16c](https://github.com/bootgs/boot/commit/2a5e16ca2d7d6037f179141c08b03ce47a69291d))
* **pipes:** add new pipes and refactor existing ones ([05721b5](https://github.com/bootgs/boot/commit/05721b500d999b87b79a6d7a259781b6c0a9a2a3))
* **validation:** add validation decorators and pipes ([5d04bea](https://github.com/bootgs/boot/commit/5d04bea91b7f5c6a34958a3f8a854b6fe672b892))


### Bug Fixes

* **BootApplication:** read apiPrefix directly from config instead of config.config ([3293c1b](https://github.com/bootgs/boot/commit/3293c1b2edcbc393757c98bd9a8abda72b9a3fb6))
* **core:** improve pipe handling and API prefix logic ([a5aeb03](https://github.com/bootgs/boot/commit/a5aeb03a64eda57681992f2f1cbf3dbbe2fbc2ee))
* **test:** add eslint-disable for unused-vars in ValidationDecorators ([4015355](https://github.com/bootgs/boot/commit/401535511e819d2deb1a8204138cd76effbdc7c3))

## [1.5.1](https://github.com/bootgs/boot/compare/v1.5.0...v1.5.1) (2026-03-20)


### Bug Fixes

* change onMenu to a getter returning a Proxy ([8623bf3](https://github.com/bootgs/boot/commit/8623bf339fae58e916122e431f3360d115d26cc4))

## [1.5.0](https://github.com/bootgs/boot/compare/v1.4.0...v1.5.0) (2026-03-20)


### Features

* update core logic to use apps-script-utils and refactor ([faea336](https://github.com/bootgs/boot/commit/faea3366624fcf945279d23f81def83c492b29f2))


### Bug Fixes

* format ([f5e8896](https://github.com/bootgs/boot/commit/f5e8896ab75a861abe02cccf4739c23d529a1bb5))

## [1.4.0](https://github.com/bootgs/boot/compare/v1.3.2...v1.4.0) (2026-03-20)


### Features

* **core:** add onMenu method to BootApplication for Google Apps Script menu handling ([0dbd1a9](https://github.com/bootgs/boot/commit/0dbd1a9dc9351fea0e37dfa118315b86aa8e40af))

## [1.3.2](https://github.com/bootgs/boot/compare/v1.3.1...v1.3.2) (2026-03-17)


### Bug Fixes

* format ([b16e6b7](https://github.com/bootgs/boot/commit/b16e6b71330ab34d6e8520f75e47ff1d00a06d0f))
* update apps-script-utils to v1.9.0 ([c74766f](https://github.com/bootgs/boot/commit/c74766f8965bd83987f9c2534ace9f8148686079))
* update apps-script-utils to v1.9.0 ([41f2a20](https://github.com/bootgs/boot/commit/41f2a20d9ef8c28b2b803152c5de9114d1685478))

## [1.3.1](https://github.com/bootgs/boot/compare/v1.3.0...v1.3.1) (2026-03-11)


### Bug Fixes

* add import reflect-metadata ([923ee31](https://github.com/bootgs/boot/commit/923ee3191a4415b3e0b69dab97b59bce889f2492))
* add import reflect-metadata ([f6a8b7e](https://github.com/bootgs/boot/commit/f6a8b7ecd395a0b0eecffad52978910cf26528b2))

## [1.3.0](https://github.com/bootgs/boot/compare/v1.2.0...v1.3.0) (2026-03-11)


### Features

* Refactor utils and add createApp alias ([c4ac82f](https://github.com/bootgs/boot/commit/c4ac82fed83df22816c9d065e1ac7028aedce5e9))
* restructure controllers and services ([2ebad08](https://github.com/bootgs/boot/commit/2ebad08d59d065177073af68b284dc710e27d4d6))
* restructure domain models and exceptions ([484e5eb](https://github.com/bootgs/boot/commit/484e5ebf8cee74384b91da85c46ddeb90a41fe0f))
* restructure repositories and shared utilities ([2e8c043](https://github.com/bootgs/boot/commit/2e8c043acc07d4e6eb0b3430c26a1083c650eb79))


### Bug Fixes

* add .github/FUNDING.yml ([dd0c80d](https://github.com/bootgs/boot/commit/dd0c80dfa183001b62cfcd40a1709282b52c5f7c))
* bugs ([ee0cde5](https://github.com/bootgs/boot/commit/ee0cde5ce8bb63776ec91c951e9152c482eb1c18))
* controllers ([17fcdb4](https://github.com/bootgs/boot/commit/17fcdb415ee0e7cec98976ff7b0dd6270b78cf02))
* controllers ([79339ae](https://github.com/bootgs/boot/commit/79339ae8109af400ed2e1eb3580f2d2f2cb1946a))
* Critical bug preventing dependency injection ([a62b212](https://github.com/bootgs/boot/commit/a62b212376ef6909f6c2e83fd291096b6a5a5bb7))
* imports ([c525656](https://github.com/bootgs/boot/commit/c5256565d84c6cd53aa36dd1312d7880044af84a))
* lint ([794c1b7](https://github.com/bootgs/boot/commit/794c1b760aac01e7124c8561d44f42fef69fdf91))
* lint ([9ece0d8](https://github.com/bootgs/boot/commit/9ece0d8733025d82ba75baf0489001c37776b511))
* **readme:** fix link in README.md ([938931f](https://github.com/bootgs/boot/commit/938931f39fd3646f2d5b17345d503dd27a6601e3))
* update package.json ([ece9d69](https://github.com/bootgs/boot/commit/ece9d691d0ba1a8871da7198a1e9d7a8539842c5))
* update package.json ([83c9a45](https://github.com/bootgs/boot/commit/83c9a4506d74fc3e9132d98ee8c2298a7ecf660d))

## [1.2.0](https://github.com/bootgs/boot/compare/v1.1.1...v1.2.0) (2026-03-11)


### Features

* restructure controllers and services ([2ebad08](https://github.com/bootgs/boot/commit/2ebad08d59d065177073af68b284dc710e27d4d6))
* restructure domain models and exceptions ([484e5eb](https://github.com/bootgs/boot/commit/484e5ebf8cee74384b91da85c46ddeb90a41fe0f))
* restructure repositories and shared utilities ([2e8c043](https://github.com/bootgs/boot/commit/2e8c043acc07d4e6eb0b3430c26a1083c650eb79))


### Bug Fixes

* update package.json ([ece9d69](https://github.com/bootgs/boot/commit/ece9d691d0ba1a8871da7198a1e9d7a8539842c5))
* update package.json ([83c9a45](https://github.com/bootgs/boot/commit/83c9a4506d74fc3e9132d98ee8c2298a7ecf660d))

## [1.1.1](https://github.com/bootgs/boot/compare/v1.1.0...v1.1.1) (2025-10-31)


### Bug Fixes

* bugs ([ee0cde5](https://github.com/bootgs/boot/commit/ee0cde5ce8bb63776ec91c951e9152c482eb1c18))

## [1.1.0](https://github.com/MaksymStoianov/appsscript-boot/compare/v1.0.3...v1.1.0) (2025-09-09)

### Features

- Refactor utils and add createApp alias ([c4ac82f](https://github.com/MaksymStoianov/appsscript-boot/commit/c4ac82fed83df22816c9d065e1ac7028aedce5e9))

### Bug Fixes

- Critical bug preventing dependency injection ([a62b212](https://github.com/MaksymStoianov/appsscript-boot/commit/a62b212376ef6909f6c2e83fd291096b6a5a5bb7))

## [1.0.3](https://github.com/MaksymStoianov/appsscript-boot/compare/v1.0.2...v1.0.3) (2025-09-02)

### Bug Fixes

- controllers ([17fcdb4](https://github.com/MaksymStoianov/appsscript-boot/commit/17fcdb415ee0e7cec98976ff7b0dd6270b78cf02))
- controllers ([79339ae](https://github.com/MaksymStoianov/appsscript-boot/commit/79339ae8109af400ed2e1eb3580f2d2f2cb1946a))

## [1.0.2](https://github.com/MaksymStoianov/appsscript-boot/compare/v1.0.1...v1.0.2) (2025-09-02)

### Bug Fixes

- imports ([c525656](https://github.com/MaksymStoianov/appsscript-boot/commit/c5256565d84c6cd53aa36dd1312d7880044af84a))
- **readme:** fix link in README.md ([938931f](https://github.com/MaksymStoianov/appsscript-boot/commit/938931f39fd3646f2d5b17345d503dd27a6601e3))

## [1.0.1](https://github.com/MaksymStoianov/appsscript-boot/compare/v1.0.0...v1.0.1) (2025-08-31)

### Bug Fixes

- lint ([794c1b7](https://github.com/MaksymStoianov/appsscript-boot/commit/794c1b760aac01e7124c8561d44f42fef69fdf91))
- lint ([9ece0d8](https://github.com/MaksymStoianov/appsscript-boot/commit/9ece0d8733025d82ba75baf0489001c37776b511))

## 1.0.0 (2025-07-25)

### Bug Fixes

- add .github/FUNDING.yml ([dd0c80d](https://github.com/MaksymStoianov/appsscript-boot/commit/dd0c80dfa183001b62cfcd40a1709282b52c5f7c))
