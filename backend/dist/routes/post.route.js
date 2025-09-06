import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { db } from '../config/firebase-admin.js';
import multer from 'multer';
import { uploadImage } from '../utils/uploadimage.js';
const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
postRouter.use(verifyToken);
postRouter.post("/create", upload.single("file"), async (req, res) => {
    try {
        const { address, description, location } = req.body;
        const userId = req.user.uid;
        const file = req.file;
        const url = await uploadImage(file);
        const post = await db.collection("posts").add({
            userId,
            address,
            description,
            location,
            media: url,
            createdAt: new Date(),
            likeCount: 0,
            dislikeCount: 0,
            commentCount: 0
        });
        return res.json({
            post
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.code
        });
    }
});
export default postRouter;
//# sourceMappingURL=post.route.js.map