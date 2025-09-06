import express from 'express';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.js';
const userRouter = express.Router();
userRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        return res.json({
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "some error occured"
        });
    }
});
userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = response.user;
        return res.json({
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.code
        });
    }
});
userRouter.get('/me', async (req, res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return res.json({
                msg: "you're logged in"
            });
        }
        else {
            return res.json({
                msg: "you're logged out"
            });
        }
    });
});
userRouter.get("/whoami", async (req, res) => {
    const user = auth.currentUser;
    const token = await user?.getIdToken();
    return res.json(token);
});
export default userRouter;
//# sourceMappingURL=user.route.js.map