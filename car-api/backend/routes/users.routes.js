import express from "express"
import { logoutUser, registerUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/users.controllers.js";
import { verifyJWT } from "../middlewares/token.middleware.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout',verifyJWT,logoutUser);
export { userRouter };