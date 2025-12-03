import express from "express";
import { registerUser, loginUser, googleSignup, facebookSignup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/googleSignup", googleSignup);

userRouter.post("/facebookSignup", facebookSignup);

export default userRouter;