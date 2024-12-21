require('dotenv').config();
const mongoose = require('mongoose');
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
        const user = new User({ name, email, password }); // Simpan password langsung
        await user.save();
        console.log(`User : ${name} created successfully`);
    } 
    catch (err) {
        console.error('Error creating user:', err.message);
    } 
};

(async () => {
    await connectDB();

    // Sesuaikan dengan user yang ingin dibuat
    await createUser('User Admin', 'nabiel@admin.com', 'adminganteng');
    await createUser('User Biasa', 'nabiel@user.com', 'userbiasa');

    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
    });
})();
