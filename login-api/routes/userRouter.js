import express from "express";
import { registerUser, loginUser, googleSignup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/googleSignup", googleSignup)

export default userRouter;