# Security Policy

This document explains which versions of **Boot.gs** receive security fixes and how to report a vulnerability.
We appreciate the work of security researchers who help keep the framework and its users safe.

## Supported Versions

| Version  | Supported          |
| :------- | :----------------- |
| `1.10.x` | :white_check_mark: |
| `< 1.10` | :x:                |

The latest minor release receives all fixes. After a new minor release, the previous minor still receives security
fixes for 3 months (see [SUPPORT.md](SUPPORT.md)). Please upgrade to the latest release to stay protected.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public issues, discussions or pull requests.**

1. **Preferred:** use GitHub private vulnerability reporting — open the repository's
   [**Security** tab → **Report a vulnerability**](https://github.com/bootgs/boot/security/advisories/new).
2. **Alternative:** email [security@maksymstoianov.com](mailto:security@maksymstoianov.com).

Please include:

- a short description and the type of issue (for example injection, prototype pollution, information disclosure);
- the affected versions;
- steps to reproduce or a proof of concept;
- the impact as you understand it, and any suggested fix.

## Response Timeline

| Step                                       | Target                       |
| :----------------------------------------- | :--------------------------- |
| Acknowledgement of the report              | within 5 business days       |
| Initial assessment (validity and severity) | within 14 days               |
| Fix released for critical or high severity | within 30 days of assessment |
| Fix for medium or low severity             | in a regular release         |

We keep you informed of progress and may ask for more details. Severity is rated with
[CVSS v3.1](https://www.first.org/cvss/v3.1/specification-document).

## Coordinated Disclosure

- We follow coordinated vulnerability disclosure: please keep the details private until a fix is released or
  90 days have passed since your report, whichever comes first, unless we agree on another date together.
- Fixes are published as a new release, and confirmed vulnerabilities get a
  [GitHub Security Advisory](https://github.com/bootgs/boot/security/advisories) and, where applicable, a CVE.
- If a report is out of scope or not a vulnerability, we tell you why.

## Credit

With your permission, we credit reporters by name or handle in the security advisory and release notes. Tell us
in your report how you would like to be credited, or if you prefer to stay anonymous. We do not run a paid bug
bounty programme.

## Scope

In scope: the source code in this repository and the `bootgs` package published on npm.

Out of scope: vulnerabilities in Google Apps Script itself or other Google services (report them to
[Google](https://bughunters.google.com/)), in third-party dependencies (report them upstream; we will update
the dependency), and in applications built with Boot.gs that are caused by their own code or configuration.

## Verifying a Release

**npm package.** Versions from 1.10.0 on are published from GitHub Actions with
[npm provenance](https://docs.npmjs.com/generating-provenance-statements). After installing, check the registry
signatures and provenance attestations of your dependency tree:

```bash
npm audit signatures
```

The provenance shown on [npmjs.com/package/bootgs](https://www.npmjs.com/package/bootgs) names the repository
`bootgs/boot`, the workflow `.github/workflows/release-please.yml` and the commit the version was built from.

**GitHub release assets.** Releases after 1.10.1 (the workflow change in pull request #171) carry the npm tarball
`bootgs-<version>.tgz`, its Sigstore build provenance `bootgs-<version>.tgz.sigstore.json` and the CycloneDX SBOM
`bootgs-<version>.cdx.json`. 1.10.1 has only an SBOM (`sbom.cdx.json`); earlier releases have no assets. Verify a
downloaded tarball with the [GitHub CLI](https://cli.github.com/):

```bash
gh attestation verify bootgs-<version>.tgz --repo bootgs/boot \
  --signer-workflow bootgs/boot/.github/workflows/release-please.yml
```

The attestation is valid only if it was signed by the `release-please.yml` workflow of `bootgs/boot`, which runs on
pushes to `main` (or a manual run for an existing tag).

## Secrets and Credentials

- No long-lived publishing credential exists: npm publishing uses
  [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) from the `npm` environment.
- Workflows use only the per-run `GITHUB_TOKEN`, with permissions declared per job (`release-please.yml` passes
  `secrets.GITHUB_TOKEN` to release-please; no other secret is referenced).
- If a secret becomes necessary, it is stored only as a GitHub Actions secret scoped to an environment, is
  accessible to maintainers only, and is rotated at least once a year and immediately on suspected exposure.
- GitHub secret scanning and push protection are enabled for the repository.
- Who has access to these resources: [MAINTAINERS.md](MAINTAINERS.md#access-to-sensitive-resources).

## Dependency and Code Scanning Policy

**Software composition analysis (SCA).**
[ci.yml](.github/workflows/ci.yml) runs on every pull request and on pushes to `main` and `develop`:

- `npm audit --omit=dev --audit-level=high` — a high or critical vulnerability in a runtime dependency fails the
  check and blocks merging;
- the `licences` step — a runtime dependency outside the allow-list (`Apache-2.0`, `MIT`, `BSD-2-Clause`,
  `BSD-3-Clause`, `ISC`, `0BSD`) fails the check and always blocks merging.

Moderate and low findings are fixed within 30 days or before the next release, whichever comes first, usually
through [Dependabot](.github/dependabot.yml) updates. No release is made while an SCA violation is open.

**Static analysis (SAST).** [CodeQL](.github/workflows/codeql.yml) analyses JavaScript/TypeScript and GitHub Actions
on every pull request and push to `main` and `develop` and weekly; ESLint with `eslint-plugin-security` runs in CI.
High and critical CodeQL alerts are fixed before merging, medium ones before the next release. A finding may be
dismissed only as a false positive or not exploitable, with the reason written in the alert.

These thresholds are project policy, applied through the required CI checks and maintainer review of every pull
request.

## Security Best Practices for Users

1. **Keep dependencies updated:** use the latest `bootgs` release and keep other packages current.
2. **Secret management:** never commit API keys or secrets; use `PropertiesService` or another secret store.
3. **Least privilege:** request only the OAuth scopes you need in `appsscript.json`.
4. **Input validation:** validate and sanitise all request input, for example with the built-in validation pipes.

---

_Thank you for helping us keep **Boot.gs** secure!_
