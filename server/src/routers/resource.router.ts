import { Router } from "express"
import {
  getAllResources,
  getResourceStats,
  shortenResource,
} from "../controllers/resource.controller"
import { validateRequestBody } from "../validators/validate-request"
import z from "zod"

const shortenPostSchema = z.object({
  originalURL: z.string(),
})

const resourceRouter = Router()

resourceRouter.get("/all", getAllResources)

resourceRouter.post(
  "/shorten",
  validateRequestBody(shortenPostSchema),
  shortenResource
)

resourceRouter.get("/stats/:statsCode", getResourceStats)

export default resourceRouter
