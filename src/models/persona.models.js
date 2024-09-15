import mongoose from "mongoose";

const personaSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        maxlength: 500,
        default : 'Por completar',
    },
    skills: { 
        type: String, 
        maxlength: 200,
        default : 'Por completar',
    },
    profession: { 
        type: String, 
        maxlength: 100,
        default : 'Por completar',
    },
    birthDate: { 
        type: Date 
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    phone: { 
        type: String, 
        match: /^[0-9]{7,15}$/ ,
        unique : true,
        sparse: true,
    },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'unspecified'], 
        default: 'unspecified' 
    }
});

export default mongoose.model('Persona', personaSchema);
