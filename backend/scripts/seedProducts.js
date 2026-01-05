import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product.model.js';
import connectDB from '../config/db.js';

dotenv.config();

const sampleProducts = [
    {
        name: "Fender Stratocaster Guitar",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        description: "Classic electric guitar with versatile sound",
        category: "Guitars",
        stock: 15
    },
    {
        name: "Gibson Les Paul",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500",
        description: "Legendary rock guitar with rich tone",
        category: "Guitars",
        stock: 8
    },
    {
        name: "Yamaha Digital Piano",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500",
        description: "88-key weighted digital piano",
        category: "Keyboards",
        stock: 12
    },
    {
        name: "Pearl Drum Kit",
        price: 1599.99,
        image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500",
        description: "Professional 5-piece drum set",
        category: "Drums",
        stock: 6
    },
    {
        name: "Shure SM58 Microphone",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
        description: "Industry standard vocal microphone",
        category: "Audio",
        stock: 25
    },
    {
        name: "Marshall Amplifier",
        price: 799.99,
        image: "https://images.unsplash.com/photo-1558369981-f9ca78462e61?w=500",
        description: "Classic rock amplifier with iconic sound",
        category: "Amplifiers",
        stock: 10
    },
    {
        name: "Roland Electric Drum Kit",
        price: 1899.99,
        image: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=500",
        description: "Mesh-head electronic drum set",
        category: "Drums",
        stock: 7
    },
    {
        name: "Ibanez Bass Guitar",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=500",
        description: "4-string electric bass guitar",
        category: "Bass",
        stock: 14
    },
    {
        name: "Korg Synthesizer",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=500",
        description: "Analog modeling synthesizer",
        category: "Keyboards",
        stock: 9
    },
    {
        name: "Taylor Acoustic Guitar",
        price: 1799.99,
        image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500",
        description: "Premium acoustic guitar",
        category: "Guitars",
        stock: 11
    },
    {
        name: "Audio-Technica Headphones",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500",
        description: "Professional studio monitor headphones",
        category: "Audio",
        stock: 30
    },
    {
        name: "Zildjian Cymbal Set",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1586281780349-79d6086d9e6c?w=500",
        description: "Professional cymbal pack",
        category: "Drums",
        stock: 8
    },
    {
        name: "Focusrite Audio Interface",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500",
        description: "2-channel USB audio interface",
        category: "Audio",
        stock: 20
    },
    {
        name: "Epiphone SG Guitar",
        price: 449.99,
        image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=500",
        description: "Classic rock electric guitar",
        category: "Guitars",
        stock: 16
    },
    {
        name: "Casio Stage Piano",
        price: 649.99,
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500",
        description: "Portable 88-key stage piano",
        category: "Keyboards",
        stock: 13
    },
    {
        name: "Fender Bass Amplifier",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1581432823205-1465a1899762?w=500",
        description: "100W bass combo amplifier",
        category: "Amplifiers",
        stock: 12
    },
    {
        name: "Sennheiser Wireless System",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1614460454751-b3e0dd20f063?w=500",
        description: "Professional wireless microphone system",
        category: "Audio",
        stock: 10
    },
    {
        name: "PRS Custom 24 Guitar",
        price: 3299.99,
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
        description: "High-end custom electric guitar",
        category: "Guitars",
        stock: 5
    },
    {
        name: "Nord Stage Keyboard",
        price: 3999.99,
        image: "https://images.unsplash.com/photo-1552083375-1447ce886485?w=500",
        description: "Professional stage keyboard workstation",
        category: "Keyboards",
        stock: 4
    },
    {
        name: "DW Collector's Series Drums",
        price: 4999.99,
        image: "https://images.unsplash.com/photo-1543443374-a43af7f8e50e?w=500",
        description: "Premium handcrafted drum kit",
        category: "Drums",
        stock: 3
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log(`✅ Successfully added ${products.length} products to the database`);
        
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - $${product.price}`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
