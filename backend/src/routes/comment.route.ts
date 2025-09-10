import express from "express";
import { commentSchema, replySchema } from "../zodTypes/comment.schema.js";
import { db } from "../config/firebase-admin.js";
import { auth } from "../config/firebase.js";
import {
  verifyToken,
  type customRequest,
} from "../middlewares/authMiddleware.js";
import { FieldValue } from "firebase-admin/firestore";

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
    } //user id not sent or somethiong is fishy 
    const { content, username } = req.body;
    const postId = req.params.id;
    const userId = (req as unknown as customRequest).user.uid;

    const comment = await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        userId: userId,
        username,
        content,
        createdAt: new Date(),
      });

      await db.collection("posts").doc(postId).update({
        commentCount: FieldValue.increment(1)
      })

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

//get all replies of a comment
commentRouter.get("/reply", async (req, res) => {
  try {
    const {postId, commentId} = req.query

    const postIdStr = postId as string
    const commentIdStr = commentId as string

    const snapshot = await db
      .collection("posts")
      .doc(postIdStr)
      .collection("comments")
      .doc(commentIdStr)
      .collection("replies")
      .get();

    const replies = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({ replies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "error fetching replies",
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

    const { replyToUserId, commentId, postId, content, username } = req.body;
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
        username,
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

//get all comments of a post

commentRouter.get("/all/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const snapshot = await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .get();

    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "error fetching comments",
    });
  }
});



export default commentRouter;
