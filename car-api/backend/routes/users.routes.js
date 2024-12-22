import express from "express"
import { logoutUser, refreshAccessToken, registerUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/users.controllers.js";
import { verifyJWT } from "../middlewares/token.middleware.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout',verifyJWT,logoutUser);
userRouter.post('/refresh-token',refreshAccessToken);

export { userRouter };