import { User } from "../models/users.models.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      res.status(404).json({ message: "Please enter email and password." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const apiKey = crypto.randomBytes(32).toString("hex");
    const newUser = new User({ name, password, email, apiKey });
    await newUser.save();

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        apiKey: newUser.apiKey,
      },
      message: `User registered successfully wiht entries: ${newUser.name},${newUser.email},${newUser.apiKey}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).json({
      message: "CANNOT GET ACCESS AND REFRESH TOKEN: ",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      res.status(400).json({ message: "Please enter email and password." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Password is invalid" });
    }
    console.log("LOGIN SUCCESS!");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    }; //security step, stops modification of cookies from the frontend, can only be modified from server
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "USER LOGGED IN SUCCESSFULLY",
      });
  } catch (error) {
    res.status(500).json({ message: "ERROR OCCURED: ", error: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = req.user; 
    
    res.json({
      email: user.email,
      name: user.name,
      apiKey: user.apiKey,
      createdAt:user.createdAt, 
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
};
export const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "USER LOGGED OUT SUCCESSFULLY" });
};

export const refreshAccessToken = async (req, res) => {
  try {
    const inputRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!inputRefreshToken) {
      res.status(401).json({ message: "UNAUTHORIZED REQUEST" });
    }
    const decodedToken = jwt.verify(
      inputRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      res.status(401).json({ message: "INVALID REFRESH TOKEN" });
    }
    if (inputRefreshToken !== user?.refreshToken) {
      res.status(401).json({ message: "REFRESH TOKEN IS EXPIRED" });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        accessToken,
        refreshToken: newRefreshToken,
        message: "ACCESS TOKEN REFRESHED SUCCESSFULLY!",
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "UNEXPECTED ERROR CAUGHT", error: error.message });
  }
};
