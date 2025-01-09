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

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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

app.options('*', cors()); // Handle preflight requests

app.use('/api/contact',contactRouter);
app.use('/api/users', userRouter);
app.use('/api/cars', verifyApiKey,apiLimiter, carRouter);

export { app }