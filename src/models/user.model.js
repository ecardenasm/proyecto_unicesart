import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString() // Genera un ID único
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique : true,
    },
    status: {
        type: String
    },
    persona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
    },
    lastConnection: {
        type: Date
    },
    role: {
        type: Number, 
        required: true,
        default: 2 // Usuario común 
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
