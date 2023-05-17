import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try{

        const client = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return client
    }
    catch (err) {
        console.log(`DB Connection Failed: ${err.message}`)
    }
    
}