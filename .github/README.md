# GitHub Configuration

This directory contains GitHub-specific configuration files, settings, and workflows.

- `FUNDING.yml` — Sponsorship and funding configuration.
- `dependabot.yml` — Weekly dependency updates for npm packages and GitHub Actions.
- `workflows/` — GitHub Actions workflow definitions:
  - `ci.yml` — Pull request and branch checks (types, lint, format, tests, build, audit, licences).
  - `release-please.yml` — Release PRs, npm publishing with provenance and the release SBOM.
  - `scorecard.yml` — OpenSSF Scorecard supply-chain analysis.
