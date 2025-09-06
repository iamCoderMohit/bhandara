import express from 'express'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.js'
import { userSchema } from '../zodTypes/user.schema.js'

const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
    const result = userSchema.safeParse(req.body)

    if(!result.success){
        return res.status(403).json({
            msg: "invalid fields"
        })
    }
    const {email, password} = req.body

    try {   
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user

        return res.json({
            user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg: "some error occured"
        })
    }
})

userRouter.post('/signin', async (req, res) => {
    const result = userSchema.safeParse(req.body)

    if(!result.success){
        return res.status(403).json({
            msg: "invalid fields"
        })
    }
    
    const {email, password} = req.body
    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        const user = response.user

        return res.json({
            user
        })
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({
            msg: error.code
        })
    }
})

userRouter.get('/me', async (req, res) => {
    const token = await auth.currentUser?.getIdToken()
    onAuthStateChanged(auth, (user) => {
        if(user){
            return res.json({
                token
            })
        } else {
            return res.json({
                msg: "you're logged out"
            })
        }
    })
})

export default userRouter