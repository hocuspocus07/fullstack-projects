import mongoose, { Schema } from "mongoose"

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    techstack: {
        type: [String],
        required: true
    },
    githubLink: {
        type: String,
        required: false,
    },
    liveLink: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["in progress", "completed"],
        default: "completed"
    },
    category: {
        type: String,
        required: false,
        trim: true
    },
    tags: {
        type: [String],
        required: false
    }
}, { timestamps: true })

export const Project = mongoose.model("Project", projectSchema);