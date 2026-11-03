# Controlling the Response

[← Back to README](../../README.md) · [Documentation index](README.md)

## ResponseEntity

The `ResponseEntity` class provides a flexible way to build full HTTP responses, including status codes, headers, and
MIME types.

```TypeScript
import {Get, RestController, ResponseEntity, HttpStatus, ContentMimeType, Param} from "bootgs";

@RestController("users")
export class UserController {

    @Get("{id}")
    getUser(@Param("id") id: string): ResponseEntity {
        const user = {id, name: "John Doe"};

        if (!user) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok()
            .header("X-Custom-Header", "Value")
            .body(user);
    }

    @Get({path: "export", produces: ContentMimeType.CSV})
    exportData(): ResponseEntity<string> {
        const csvData = "id,name\n1,John Doe";
        return ResponseEntity.ok(csvData);
    }
}
```

## ResponseBody

The `@ResponseBody` decorator indicates that the return value of a method should be bound directly to the response body,
bypassing the default framework wrapper (which normally includes `status`, `ok`, and `body` fields in the JSON
response).

> [!NOTE]
> `@RestController` automatically applies `@ResponseBody` to all its methods.

```TypeScript
import {Get, HttpController, ResponseBody} from "bootgs";

@HttpController("raw")
export class RawController {

    @Get("data")
    @ResponseBody()
    getRawData(): object {
        return {message: "This will be returned as the root JSON object"};
    }
}
```
