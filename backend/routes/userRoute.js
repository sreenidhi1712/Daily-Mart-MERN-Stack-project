import express from "express";
import { loginUser, registerUser,getUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// create user using user's data- name, email and password
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/getUser",authMiddleware, getUser);

export default userRouter;
