import type { NextFunction, Request, Response } from "express";
import { authAdmin } from "../config/firebase-admin.js";

export interface customRequest extends Request{
    user: any
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const customReq = req as customRequest
    const token = req.headers.authorization?.split(" ")[1]

    if(!token) return res.status(401).json({error: "no token provided"})

    try {
        const decoded = await authAdmin.verifyIdToken(token)
        customReq.user = decoded
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({
            error: "invalid token"
        })
    }
}