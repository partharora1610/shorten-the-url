import { Response, Request, NextFunction } from "express"
import { AnyZodObject, ZodError } from "zod"
import { RequestValidationError } from "../errors/request-validation"
import { InternalServerError } from "../errors/internal-server"

export const validateRequestBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)
      req.body = schema.parse(req.body)

      next()
    } catch (e) {
      console.log(e)
      if (e instanceof ZodError) {
        return next(new RequestValidationError(e))
      }
      next(new InternalServerError())
    }
  }
}
