import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

export const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        // Check if URI is valid or if we should use memory server
        if (!uri || uri.includes('cluster0.erkhd.mongodb.net') || uri.includes('localhost')) {
            console.log("Using in-memory MongoDB...");
            const mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        // Fallback to memory server on error if not already tried
        try {
            console.log("Connection failed, falling back to in-memory MongoDB...");
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            const conn = await mongoose.connect(uri);
            console.log(`MongoDB Connected (Fallback): ${conn.connection.host}`);
        } catch (fallbackErr) {
            console.error(`Fallback Error: ${fallbackErr.message}`);
            process.exit(1);
        }
    }
};
export default connectDB;