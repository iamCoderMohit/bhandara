import express from 'express'
import { setDoc, doc, addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../config/firebase.js'
import { verifyToken, type customRequest } from '../middlewares/authMiddleware.js'

const postRouter = express.Router()

postRouter.use(verifyToken as express.RequestHandler)

postRouter.post("/create", async (req, res) => {
    try {
        const {address, description, location, media} = req.body
        const userId = (req as customRequest).user.uid

        const post = await addDoc(collection(db, "posts"), {
            userId,
            address,
            description,
            location,
            media,
            likeCount: 0,
            dislikeCount: 0,
            createdAt: new Date()
        })

        return res.json({
            post
        })
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({
            msg: error.code
        })
    }
})

export default postRouter