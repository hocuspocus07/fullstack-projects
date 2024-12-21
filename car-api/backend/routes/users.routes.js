import express from "express"
import { registerUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/users.controllers.js";

const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);

export { userRouter };