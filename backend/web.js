import "dotenv/config"; 
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(cors());

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