import { User } from "../models/users.models.js";
import crypto from "crypto"

export const registerUser = async(req, res) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            res.status(404).json({ message: "Please enter email and password." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const apiKey = crypto.randomBytes(32).toString('hex');
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
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}