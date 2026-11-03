# Privacy

**Boot.gs collects no data.**

- The library makes **no network calls**: it does not use `UrlFetchApp`, `fetch` or any other HTTP client, and it
  contacts no server — neither the maintainers' nor a third party's.
- It contains **no telemetry**, analytics, tracking or "phone home" code.
- It runs entirely inside your Google Apps Script project. Request data, events and anything your handlers process
  stay in your project and the Google services your own code calls.
- The only Apps Script services the library touches are those needed to answer requests on your behalf, such as
  `ContentService` and `HtmlService` for responses.

Your own application code, other libraries you add and Google's services are governed by their own terms and
privacy policies, for example the [Google Privacy Policy](https://policies.google.com/privacy).

Installing the package from npm is subject to the
[npm privacy policy](https://docs.npmjs.com/policies/privacy); the project receives only the aggregate download
counts that npm publishes.

Questions: open an [issue](https://github.com/bootgs/boot/issues) or see [SUPPORT.md](../SUPPORT.md).
