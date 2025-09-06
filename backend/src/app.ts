import express from "express"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import cors from 'cors'
import commentRouter from "./routes/comment.route.js"
import chatRouter from "./routes/chat.route.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)
app.use('/api/v1/comment', commentRouter)
app.use('/api/v1/chat', chatRouter)

export default app