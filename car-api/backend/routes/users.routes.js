import express from "express"
import { registerUser } from "../controllers/users.controllers.js";

const userRouter = express.Router();

userRouter.post('/', registerUser);

export { userRouter };