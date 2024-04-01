import express from "express"
import connectDB from "./db/db.js"
import authRouter from "./routes/auth.route.js"
import prodRouter from "./routes/product.route.js"
import userRouter from "./routes/user.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
const __dirname = path.resolve()
const app = express()
const port = 3000
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
)

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/products", prodRouter)
app.use("/api/user", userRouter)

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
