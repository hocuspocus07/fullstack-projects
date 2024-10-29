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
        type: [Number, 'please enter a valid number'],
        required: false,
    },
    message: {
        type: [String, 'Message cannot be empty'],
        required: true,
    },
    subject: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["new", "replied", ],
        default: "new",
    },
    company: {
        type: String,
        required: false,
    },
    attachments: {
        type: [String],
        required: false,
    },
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);