# Contributing to Boot.gs

Great that you are here and you want to contribute to **Boot.gs**!

## Contents

<!-- TOC -->

- [Contributing to Boot.gs](#contributing-to-bootgs)
  - [Contents](#contents)
  - [Code of Conduct](#code-of-conduct)
  - [Directory Structure](#directory-structure)
  - [Development Setup](#development-setup)
    - [Requirements](#requirements)
      - [Node.js](#nodejs)
      - [npm](#npm)
    - [Actual Setup](#actual-setup)
  - [Development Cycle](#development-cycle)
    - [Basic Development Workflow](#basic-development-workflow)
    - [Commit Message Guidelines](#commit-message-guidelines)
    - [Community PR Guidelines](#community-pr-guidelines)
      - [1. General Requirements](#1-general-requirements)
      - [2. PR Specific Requirements](#2-pr-specific-requirements)
    - [Test Suite](#test-suite)
  - [Roadmap](#roadmap)
  - [License](#license)

<!-- TOC -->

## Code of Conduct

This project and everyone participating in it are governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code. Please report unacceptable behavior
to [stoianov.maksym+bootgs@gmail.com](mailto:stoianov.maksym+bootgs@gmail.com).

## Directory Structure

The project is organized as follows:

- [**`config/`**](config/) — Configuration files for build tools and environment.
- [**`docs/`**](docs/) — Documentation and assets.
- [**`scripts/`**](scripts/) — Utility scripts for maintenance and development.
- [**`src/`**](src/) — Source code of the framework.
- [**`test/`**](test/) — Test suites mirroring the `src` structure.

## Development Setup

### Requirements

#### Node.js

[Node.js](https://nodejs.org/en/) (latest LTS recommended) is required for development.

#### npm

[npm](https://www.npmjs.com/) is used for dependency management and scripts.

### Actual Setup

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your_username>/boot.git
   cd boot
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/bootgs/boot.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Build the project**:
   ```bash
   npm run build
   ```

## Development Cycle

### Basic Development Workflow

1. Hack, hack, hack.
2. Ensure code quality:
   ```bash
   npm run lint
   npm run format
   ```
3. Run [tests](#test-suite):
   ```bash
   npm run test
   ```
4. Commit your changes following the [Commit Message Guidelines](#commit-message-guidelines) and create a Pull Request.

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Structured commit messages allow automated tools like [Release Please](https://github.com/googleapis/release-please-action) to generate changelogs and determine semantic version bumps automatically.

#### Commit Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

| Type       | Description                                                  | Release Impact  |
| :--------- | :----------------------------------------------------------- | :-------------- |
| `feat`     | A new feature                                                | Minor (`0.x.0`) |
| `fix`      | A bug fix                                                    | Patch (`0.0.x`) |
| `docs`     | Documentation changes only                                   | None            |
| `style`    | Formatting, missing semi-colons, whitespace (no code change) | None            |
| `refactor` | Code restructuring without adding features or fixing bugs    | None            |
| `perf`     | Performance improvements                                     | Patch / None    |
| `test`     | Adding or updating tests                                     | None            |
| `build`    | Changes to build configuration or dependencies               | None            |
| `ci`       | Changes to CI workflows and scripts                          | None            |
| `chore`    | Routine tasks, maintenance, or tooling changes               | None            |

#### Scopes

The scope specifies the affected module or package (e.g., `core`, `decorators`, `router`, `service`, `domain`, `pipes`, `validation`, `config`). Scope is optional but encouraged for clarity.

#### Breaking Changes

Breaking changes should be indicated by an exclamation mark `!` before the colon in the header or by a `BREAKING CHANGE:` footer. This triggers a Major version bump (`x.0.0`).

```text
feat(core)!: drop support for legacy handler format
```

#### Rules & Best Practices

- **Imperative mood**: Use the imperative, present tense ("add", "fix", "change", not "added", "fixes", "changing").
- **Case**: Start the description in lowercase.
- **Punctuation**: Do not end the description with a period (`.`).
- **Issue references**: Reference relevant issue numbers when applicable (e.g., `(fixes #100)`).

#### Examples

- `feat(decorators): add @SheetController and @DocController`
- `fix(router): resolve route inheritance issues in controllers (fixes #100)`
- `docs: update README with new response features`
- `refactor(core): cleanup enums, types and repository helpers`
- `test: add unit tests for ResponseBuilder`
- `chore: update dependencies`

### Community PR Guidelines

#### 1. General Requirements

- **Follow the Style Guide**: Adhere to the project's coding standards (TypeScript, decorators, DI).
- **TypeScript Compliance**: No `ts-ignore` unless absolutely necessary (and documented).
- **Avoid Repetitive Code**: Reuse existing utilities and patterns.
- **Testing**: PRs **must include tests**.
- **Typos**: Use a spell-checker to avoid typos in code and documentation.

#### 2. PR Specific Requirements

- **Small PRs**: Focus on a single feature or fix per PR.
- **Naming**: Use clear and descriptive PR titles.

### Test Suite

The project uses [Vitest](https://vitest.dev/) for testing.

- **Run all tests**:
  ```bash
  npm run test
  ```
- **Watch mode**:
  ```bash
  npm run dev
  ```

## Roadmap

The current vision for the project's development can be found in the [Roadmap](ROADMAP.md). Please note that the
roadmap is for informational purposes and is subject to change.

## License

By contributing to **Boot.gs**, you agree that your contributions will be licensed under
the [Apache-2.0 License](LICENSE).
