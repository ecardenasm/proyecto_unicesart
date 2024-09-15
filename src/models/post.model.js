import mongoose from "mongoose";
import { Category } from "./category.models.js"

const postSchema = new mongoose.Schema({
    postId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: Category,
    technique: { type: String },
    type: { type: String, required: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String },
    user: {
        userId: { type: String, required: true },
        nickName: { type: String, required: true }
    },
    likes: [{
        user: {
            userId: { type: String, required: true },
            nickName: { type: String, required: true }
        }
    }],
    date: { type: Date, default: Date.now, required: true },
    status: { type: String }
});

export default mongoose.model('Post', postSchema);