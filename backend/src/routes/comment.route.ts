import express from "express";
import { commentSchema, replySchema } from "../zodTypes/comment.schema.js";
import { db } from "../config/firebase-admin.js";
import { auth } from "../config/firebase.js";
import {
  verifyToken,
  type customRequest,
} from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.use(verifyToken as express.RequestHandler);

//comment on a post
commentRouter.post("/create/:id", async (req, res) => {
  try {
    const result = commentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(401).json({
        msg: "invalid comment type",
      });
    }
    const { content } = req.body;
    const postId = req.params.id;
    const userId = (req as unknown as customRequest).user.uid;

    const comment = await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        userId: userId,
        content,
        createdAt: new Date(),
      });

    return res.json({
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "cant comment try again",
    });
  }
});

//reply to a comment
commentRouter.post("/reply", async (req, res) => {
  try {
    const result = replySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(401).json({
        msg: "invalid inputs",
      });
    }

    const { replyToUserId, commentId, postId, content } = req.body;
    const authorId = (req as customRequest).user.uid;

    await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .collection("replies")
      .add({
        userId: authorId,
        replyToUserId,
        content,
        createdAt: new Date(),
      });

    return res.json({
      msg: "reply done",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "cant reply, try again",
    });
  }
});

export default commentRouter;
