import express from "express"
import cors from "cors"
import dotenv from "dotenv"

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

import projectRouter from "./routes/projects.routes.js";
import contactRouter from "./routes/contact.routes.js";

app.use("/api/projects", projectRouter);
app.use("/api/contact", contactRouter);
export { app }