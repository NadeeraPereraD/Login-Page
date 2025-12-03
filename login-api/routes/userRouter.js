import express from "express";
import { registerUser, loginUser, googleAuth, facebookAuth } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/google", googleAuth);

userRouter.post("/facebook", facebookAuth);

export default userRouter;