import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseconfig";

export async function createUser(uid: string, email: string) {
    const user = await setDoc(doc(db, "users", uid), {
        email: email,
        followers: 0,
        following: 0,
        createdAt: new Date()
    })

    return user
}