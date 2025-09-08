import express from "express";
import {
  verifyToken,
  type customRequest,
} from "../middlewares/authMiddleware.js";
import { db } from "../config/firebase-admin.js";
import multer from "multer";
import { uploadImage } from "../utils/uploadimage.js";
import { postSchema, updatePostSchema } from "../zodTypes/post.schema.js";
import { FieldValue } from "firebase-admin/firestore";

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.use(verifyToken as express.RequestHandler);

postRouter.post("/create", upload.single("file"), async (req, res) => {
  try {
    // const result = postSchema.safeParse(req.body);

    // if (!result.success) {
    //   return res.status(401).json({
    //     msg: "invalid inputs",
    //   });
    // }
    const { address, description, location, username } = req.body;
    const userId = (req as customRequest).user.uid;
    const file = req.file;

    const url = await uploadImage(file);

    const post = await db.collection("posts").add({
      userId,
      username,
      address,
      description,
      location, //change it to geopoints
      media: url,
      createdAt: new Date(),
      likeCount: 0,
      dislikeCount: 0,
      commentCount: 0,
    });

    return res.json({
      post,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      msg: error.code,
    });
  }
});

postRouter.put("/update/:id", async (req, res) => {
  try {
    const result = updatePostSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(401).json({
        msg: "invalid inputs",
      });
    }
    const { address, description, location } = req.body;
    const postId = req.params.id;

    const post = await db.collection("posts").doc(postId).update({
      address,
      description,
      location,
    });

    return res.json({
      msg: "done",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "cant updated",
    });
  }
});


//delete
postRouter.delete('/delete/:id', async (req, res) => {
    try {
        const postId = req.params.id
        await db.collection("posts").doc(postId).delete()

        return res.json({
            msg: "deleted"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg: "cant delete try again"
        })
    }
})

//getall
postRouter.get('/all', async (req, res) => {
    try {
        const snapshot = await db.collection("posts").get()

        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return res.json({posts})
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg: "cant find!! try again"
        })
    }
})


//like
postRouter.put('/like/:id', async (req, res) => {
  try {
    const postId = req.params.id

    await db.collection("posts").doc(postId).update({
      likeCount: FieldValue.increment(1)
    })

    return res.json({
      msg: "done"
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: "cant like try again"
    })
  }
})

//dislike
postRouter.put('/dislike/:id', async (req, res) => {
  try {
    const postId = req.params.id
    await db.collection("posts").doc(postId).update({
      dislikeCount: FieldValue.increment(1)
    })

    return res.json({
      msg: "done"
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: "cant dislike try again"
    })
  }
})

//get all posts of one user
postRouter.get('/getAll', async (req, res) => {
  try {
    const uid = (req as customRequest).user.uid
    const snapshot = await db.collection("posts").where("userId", "==", uid).get()

    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return res.json({posts})
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: "cant fetch posts"
    })
  }
})

//getone
postRouter.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const snapshot = await db.collection("posts").doc(postId).get()
        const post = {id: snapshot.id, ...snapshot.data()}

        return res.json({post})
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg: "error!! try again"
        })
    }
})



export default postRouter;
