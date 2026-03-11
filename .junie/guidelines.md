### Build and Configuration Instructions

#### Prerequisites

- Node.js (latest LTS recommended)
- npm (installed with Node.js)

#### Installation

Install project dependencies using:

```bash
npm install
```

#### Build

The project uses the TypeScript compiler (`tsc`) for building. To compile the source code:

```bash
npm run build
```

The output will be located in the `dist` directory.

#### Code Quality

- **Formatting**: Uses Prettier. Run `npm run format` to format the codebase.
- **Linting**: Uses ESLint. Run `npm run lint` to check for and fix linting issues.

---

### Testing Information

#### Configuration

The project uses [Vitest](https://vitest.dev/) for testing. Configuration is defined in `vitest.config.ts`.
Important: The project relies on `reflect-metadata`, which must be imported at the beginning of test files or via a
setup file.

#### Running Tests

- **All tests**: `npm run test`
- **Watch mode**: `npm run dev`
- **Specific test file**: `npx vitest run path/to/test.ts`

#### Adding New Tests

1. Create a `.test.ts` file in the `test` directory (or subdirectories mirroring `src`).
2. Ensure `import "reflect-metadata";` is at the top of the file if using decorators or metadata.
3. Use `describe`, `it`, and `expect` from `vitest`.

#### Test Example

```typescript
import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { HttpController } from "../src/decorators";
import { CONTROLLER_WATERMARK } from "../src/config/constants";

describe("Example Test", () => {
  it("should verify controller metadata", () => {
    @HttpController("/api")
    class MyController {}

    const isController = Reflect.getMetadata(CONTROLLER_WATERMARK, MyController);
    expect(isController).toBe(true);
  });
});
```

---

### Additional Development Information

#### Code Style

- Follow the existing NestJS-like architecture.
- Use decorators for defining controllers, routes, and dependency injection.
- Prefer explicit type definitions where possible.
- Use `reflect-metadata` for any custom metadata handling.

#### Key Directories

- `src/`: Source code.
  - `decorators/`: Custom decorators for controllers and methods.
  - `types/`: TypeScript type definitions and interfaces.
  - `utils/`: Internal utility functions for routing and metadata.
- `test/`: Test suites mirroring the `src` structure.

#### Dependency Management

The project has a dependency on `apps-script-utils` from a GitHub repository:
`"apps-script-utils": "github:MaksymStoianov/apps-script-utils#main"`
Ensure you have network access to GitHub when installing dependencies.
