# AI Agent Skills

[← Back to README](../../README.md) · [Documentation index](README.md)

Working with an AI coding agent (Claude Code, Gemini CLI, Cursor, etc.)? The
**[bootgs/skills](https://github.com/bootgs/skills)** repository provides a set
of [Agent Skills](https://github.com/bootgs/skills) that teach it how to scaffold, structure, and validate **Boot.gs**
applications, plus a set of framework-agnostic skills for Google Apps Script development in general.

| Skill                             | Description                                                 |
| --------------------------------- | ----------------------------------------------------------- |
| `bootgs-quickstart`               | Project scaffolding with TypeScript config and entry points |
| `bootgs-architecture`             | Controller/Service/Repository layering patterns             |
| `bootgs-validation`               | Parameter validation decorators and custom pipes            |
| `bootgs-client`                   | Virtual Transport Layer client implementation               |
| `bootgs-openapi`                  | Automatic OpenAPI 3.0 spec generation                       |
| `apps-script-triggers`            | Event handling and quota management                         |
| `apps-script-services`            | Safe usage of `SpreadsheetApp`, `PropertiesService`, etc.   |
| `apps-script-ui`                  | Menus, dialogs, sidebars, and UI patterns                   |
| `apps-script-clasp-workflow`      | CLI deployment and versioning                               |
| `apps-script-utils`               | Guard/utility library functions                             |
| `apps-script-marketplace-publish` | Add-on Marketplace compliance auditing                      |

Skills activate automatically based on agent context and user prompts — no manual invocation needed once installed.

**Claude Code:**

```bash
/plugin marketplace add bootgs/skills
/plugin install bootgs@bootgs-skills
/plugin install apps-script@bootgs-skills
```

**Gemini CLI:**

```bash
gemini extensions install https://github.com/bootgs/skills
```

**Any agent (via the `npx skills` CLI):**

```bash
npx skills add bootgs/skills --skill bootgs-quickstart
```
