import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        unique: true,
    },
    status: {
        type: String
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 500,
        default: 'Por completar',
    },
    skills: {
        type: String,
        maxlength: 200,
        default: 'Por completar',
    },
    profession: {
        type: String,
        maxlength: 100,
        default: 'Por completar',
    },
    birthDate: {
        type: Date
    },
    lugarOrigen: {
        nombreDepartamento: { type: String},
        nombreMunicipio: { type: String,}
    },
    phone: {
        type: String,
        match: /^[0-9]{7,15}$/,
        unique: true,
        sparse: true,
    },
    gender: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro'],
        default: 'Otro'
    },
    lastConnection: {
        type: Date
    },
    role: {
        type: String,
        required: true,
        enum: ['usuario', 'administrador'],
        default: 'usuario' // Usuario común 
    },
    recoverCode: {
        type : String,
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
