import {Router} from "express";
import admin from "../config/firebaseAdmin.js";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email y password son requeridos"
        });
    }

    try {
        const user = await admin.auth().createUser({
            email,
            password
        });

        return res.json({
            uid: user.uid,
            email: user.email
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
});

export default authRouter;