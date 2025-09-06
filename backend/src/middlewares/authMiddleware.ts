import type { NextFunction, Request, Response } from "express";
import { authAdmin } from "../config/firebase-admin.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";

export interface customRequest extends Request{
    user: any
}

export async function verifyToken(req: customRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]

    if(!token) return res.status(401).json({error: "no token provided"})

    try {
        const decoded = await authAdmin.verifyIdToken(token)
        req.user = decoded
        console.log("token verified")
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({
            error: "invalid token"
        })
    }
}