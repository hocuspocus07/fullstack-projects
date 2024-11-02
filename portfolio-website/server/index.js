import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { app } from "./app.js";
dotenv.config({
    path: "../.env"
})
connectDb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {})
    }).catch((error) => {
        console.log("connection failed: ", error);
    })