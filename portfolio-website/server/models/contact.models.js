import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);