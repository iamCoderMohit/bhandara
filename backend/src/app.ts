import express from "express"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"

const app = express()
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)

export default app