import express from "express";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.js";
import { userSchema } from "../zodTypes/user.schema.js";
import { db } from "../config/firebase-admin.js";
import { FieldValue } from "firebase-admin/firestore";
import { verifyToken, type customRequest } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(403).json({
      msg: "invalid fields",
    });
  }
  const { email, password } = req.body;

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;

    const newUser = await db.collection("users").doc(user.uid).set({
      email: user.email,
      followers: [],
      following: [],
      createdAt: new Date(),
    });

    return res.json({
      user: user.uid,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "some error occured",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(403).json({
      msg: "invalid fields",
    });
  }

  const { email, password } = req.body;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    return res.json({
      user,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      msg: error.code,
    });
  }
});

userRouter.put("/edit", async (req, res) => {
  try {
    const { uid, username, fullName, bio } = req.body;

    await db.collection("users").doc(uid).update({
      username,
      fullName,
      bio,
      followers: [],
      following: []
    });

    const userDoc = await db.collection("users").doc(uid).get();
    const user = {id: userDoc.id, ...userDoc.data()}

    return res.json({
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "can't update details",
    });
  }
});

userRouter.get("/me", verifyToken, async (req, res) => {
  try {
    const uid = (req as customRequest).user.uid
    const snapshot = await db.collection("users").doc(uid).get()
    const user = {id: snapshot.id, ...snapshot.data()}

    return res.json({user})
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: "cant fetch user"
    })
  }
});

//get one user
userRouter.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id

    const snapshot = await db.collection("users").doc(userId).get()

    const user = {id: snapshot.id, ...snapshot.data()}

    return res.json({user})
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: "error fetching user"
    })
  }
})

//follow a person
userRouter.put("/follow/:userId", async (req, res) => {
  try {
    const userId= req.params.userId
    const {newFollower} = req.body

    await db.collection("users").doc(userId).update({
      followers: FieldValue.arrayUnion(newFollower)
    })

    await db.collection("users").doc(newFollower).update({
      following: FieldValue.arrayUnion(userId)
    })

    res.json({
      msg: "followed"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: "cant follow try again"
    })
  }
})

//unfollow a person
userRouter.put("/unfollow/:userId", async (req, res) => {
  try {
    const userId= req.params.userId
    const {unfollower} = req.body

    await db.collection("users").doc(userId).update({
      followers: FieldValue.arrayRemove(unfollower)
    })

    await db.collection("users").doc(unfollower).update({
      following: FieldValue.arrayRemove(userId)
    })

    res.json({
      msg: "unfollowed"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: "cant unfollow try again"
    })
  }
})

export default userRouter;
