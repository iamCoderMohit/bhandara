import { authAdmin } from "../config/firebase-admin.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";
export async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "no token provided" });
    try {
        const decoded = await authAdmin.verifyIdToken(token);
        req.user = decoded;
        console.log("token verified");
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