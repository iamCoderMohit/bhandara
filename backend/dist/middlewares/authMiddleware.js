import { authAdmin } from "../config/firebase-admin.js";
export async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "no token provided" });
    try {
        const decoded = await authAdmin.verifyIdToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({
            error: "invalid token"
        });
    }
}
//# sourceMappingURL=authMiddleware.js.map