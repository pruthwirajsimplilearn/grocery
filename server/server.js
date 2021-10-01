import express from "express"
import cors from "cors"
import grocery from "./api/grocery.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/grocery_store", grocery)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app