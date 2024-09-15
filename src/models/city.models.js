import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    id: { type: String, required: true },
    nombre: { type: String, required: true },
});

export default mongoose.model('City', citySchema);