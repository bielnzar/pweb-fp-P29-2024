require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const createUser = async (name, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        console.log(`User: ${name} created successfully`);
    } catch (err) {
        if (err.code === 11000) {
            console.error(`User creation failed: Email "${email}" already exists`);
        } else {
            console.error('Error creating user:', err.message);
        }
    }
};

(async () => {
    await connectDB();

    await createUser('User Admin', 'nabiel@admin.com', 'adminganteng');
    await createUser('User Biasa', 'nabiel@user.com', 'userbiasa');

    // Tutup koneksi ke MongoDB
    mongoose.connection.close()
        .then(() => {
            console.log('MongoDB connection closed');
        })
        .catch(err => {
            console.error('Error closing MongoDB connection:', err.message);
        });
})();
