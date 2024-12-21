import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { carRouter } from "./routes/cars.routes.js"
import { userRouter } from "./routes/users.routes.js"
import { verifyApiKey } from "./middlewares/auth.middleware.js"

dotenv.config({
    path: "../.env",
})

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.use('/api/users', userRouter);
app.use(verifyApiKey);
app.use('/api/cars', carRouter);
export { app }