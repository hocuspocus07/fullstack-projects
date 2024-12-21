import { User } from "../models/users.models.js";

export const verifyApiKey = async(req, res, next) => {
    try {
        const apiKey = req.query.apiKey;
        if (!apiKey) {
            return res.status(401).json({ message: 'APIKEY MISSING' });
        }
        const user = await User.findOne({ apiKey });
        if (!user) {
            return res.status(403).json({ message: 'INAVLID API KEY' });
        }
        console.log("Valid API Key:", apiKey);
        next();
    } catch (error) {
        res.status(500).json({ message: 'ERROR OCCURRED: ', error: error.message });
    }
}