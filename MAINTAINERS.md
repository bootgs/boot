# Maintainers

| Name            | GitHub                                               | Role            |
| :-------------- | :--------------------------------------------------- | :-------------- |
| Maksym Stoianov | [@MaksymStoianov](https://github.com/MaksymStoianov) | Lead maintainer |

## Access to sensitive resources

| Resource                                                  | Who has access                                                                                                                                                                             |
| :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub organisation `bootgs` and repository `bootgs/boot` | Owner/admin: @MaksymStoianov                                                                                                                                                               |
| npm package `bootgs` (publishing)                         | npm organisation `bootgs`: @MaksymStoianov. CI publishes with npm trusted publishing (OIDC) from `release-please.yml` in the protected environment `npm`; no npm token is stored in GitHub |
| GitHub Actions secrets                                    | None are stored. Workflows use only the per-run `GITHUB_TOKEN` (`release-please.yml` passes `secrets.GITHUB_TOKEN` to release-please), with permissions declared per job                   |
| Security advisories and private vulnerability reports     | Maintainers listed above (repository admins)                                                                                                                                               |
| Emergency access to the organisation and the npm package  | A trusted backup person, only to keep the project available (see [Continuity](GOVERNANCE.md#continuity))                                                                                   |

Access is granted and reviewed as described in [GOVERNANCE.md](GOVERNANCE.md#becoming-a-maintainer).

See [GOVERNANCE.md](GOVERNANCE.md) for how decisions are made and how to become a maintainer.
