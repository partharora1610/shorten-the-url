import dotenv from "dotenv"
import app from "./apps/server"

dotenv.config()

const PORT = 5000

app.listen(PORT, () => {
  console.log("Server working")
})
