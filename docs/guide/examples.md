# Advanced Examples

[← Back to README](../../README.md) · [Documentation index](README.md)

## Pipes

Transform parameters with pipes:

```TypeScript
import {Get, RestController, Query, ParseNumberPipe} from "bootgs";

@RestController("users")
export class UserController {

    @Get("details")
    getUserDetails(@Query("id", ParseNumberPipe) id: number): object {
        return {
            userId: id,
            message: "Success!"
        };
    }
}
```

## Global Error Handling

Use `@ControllerAdvice` to handle exceptions globally across the whole application:

```TypeScript
import {ControllerAdvice, ExceptionHandler, ResponseStatus} from "bootgs";

@ControllerAdvice()
export class GlobalExceptionHandler {

    @ExceptionHandler(Error)
    @ResponseStatus(500)
    handleError(error: Error): object {
        return {
            status: "Error",
            message: error.message
        };
    }
}
```
