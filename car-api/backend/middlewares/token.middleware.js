import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path:"../../.env",
})

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ message: 'UNAUTHORIZED REQUEST' });
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const user=await User.findById(decodedToken?._id).select("-password -refreshToken");
    if(!user){
        res.status(401).json({message:'INVALID ACCESS TOKEN'});
    }
    req.user=user;
    next();
    } catch (error) {
        res.status(500).json({message:'UNEXPECTED ERROR OCCURRED, ',error:error.message});
    }
}