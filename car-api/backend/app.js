import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { carRouter } from "./routes/cars.routes.js"
import { userRouter } from "./routes/users.routes.js"
import { contactRouter } from "./routes/contact.routes.js"
import { verifyApiKey } from "./middlewares/auth.middleware.js"
import cookieParser  from "cookie-parser"

dotenv.config({
    path: "../.env",
})

const app = express()

app.use(cors({
  origin:process.env.CORS_ORIGIN || 'https://localhost:5173',
    credentials: true,
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(cookieParser());

import rateLimit from 'express-rate-limit';

const myApiKey=process.env.MY_CRON_API;
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later',
    skip: (req) => {
        const apiKey = req.query.apiKey || req.header("apiKey");
        return myApiKey.includes(apiKey);
    },
});

app.use('/api/contact',contactRouter);
app.use('/api/users', userRouter);
app.use('/api/cars', verifyApiKey,apiLimiter, carRouter);

export { app }