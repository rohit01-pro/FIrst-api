import "dotenv/config"; 
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import productRoutes from "./routes/product.route.js";

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.PRODUCTION_URL || 'https://your-vercel-domain.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

const PORT = process.env.PORT || 5002;

const __dirname = path.resolve()

app.use(express.json());

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/public')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("web started at http://localhost:"+ PORT);
});