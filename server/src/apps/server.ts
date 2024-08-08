import express from "express"
import cors from "cors"
import resourceRouter from "../routers/resource.router"
import { redirectToResource } from "../controllers/redirect.controller"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/health", (req, res) => {
  res.send("health route")
})

// redirecting logic

app.get("/:shortCode", redirectToResource)
app.use("/resource", resourceRouter)

export default app
