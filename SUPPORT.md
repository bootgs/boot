# Support

## Getting Help

- **Questions and ideas:** [GitHub Discussions](https://github.com/bootgs/boot/discussions).
- **Bugs and feature requests:** [GitHub Issues](https://github.com/bootgs/boot/issues) — please use the issue
  templates and include the `bootgs` version and a minimal reproduction.
- **Security vulnerabilities:** never in public — follow [SECURITY.md](SECURITY.md).

Community support is provided on a best-effort basis by the maintainers and contributors.

## Support Policy

Boot.gs follows [Semantic Versioning](https://semver.org/).

| Release line                      | What it receives                                                   |
| :-------------------------------- | :----------------------------------------------------------------- |
| Latest minor (currently `1.10.x`) | Bug fixes, security fixes and new features                         |
| Previous minor                    | Security fixes only, for 3 months after the next minor is released |
| Older releases                    | No fixes — please upgrade                                          |

There is no separate LTS line at the moment; the policy above applies to every major version.

### Deprecations and Breaking Changes

- A deprecation is announced in the changelog and in the API documentation (`@deprecated`) at least one minor
  release before the feature is removed.
- Deprecated features are removed only in a new major release.
- Breaking changes are listed in the release notes and `CHANGELOG.md` under **BREAKING CHANGES**.

### Runtime Requirements

- Google Apps Script V8 runtime.
- Node.js `>= 22.14.0` for development and building (see `engines` in `package.json`).

## Commercial Support

Consulting, custom development, priority fixes and support agreements are available from the maintainer:
[maksymstoianov.com](https://maksymstoianov.com).
