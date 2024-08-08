import { ZodError } from "zod"
import { CustomError } from "./custom-error"

export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(public errros: ZodError) {
    super("Invalid Request Parameter")
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errros.issues.map((issue) => {
      return { message: issue.message, field: issue.path.join(".") }
    })
  }
}
