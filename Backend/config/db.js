// ./config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://SHEKEEB:5257@cluster0.3gppriq.mongodb.net/EatZilla', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected!');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); 
    }
};

export { connectDB };
