import { HttpStatus } from "../domain/enums";
import { AppException } from "../exceptions";

export class HttpException extends AppException {
  constructor(
    public readonly message: string,
    public readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(message, status);
    this.name = "HttpException";
  }
}
