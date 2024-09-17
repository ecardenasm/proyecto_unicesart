import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, unique : true },
    description: { type: String, },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    user: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
        userName: { type: String, required: true }
    },
    likes: [{
        user: {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
            userName: { type: String,}
        }
    }],
    date: { type: Date, default: Date.now, required: true },
    status: {
        type: String,
        enum: ['Normal', 'Reportado', 'Verificación'],
        default: 'Normal',
    }
});

export default mongoose.model('Post', postSchema);