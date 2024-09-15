import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        await mongoose.connect('mongodb+srv://juliandarias:adminUnicesart@cluster0.q67xq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB is connected');
    }
    catch (error) {
        console.log(error)
    }
};