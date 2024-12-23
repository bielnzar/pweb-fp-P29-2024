require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Hentikan proses jika koneksi gagal
    }
};

const createUser = async (name, email, password) => {
    try {
        // Cek apakah email sudah ada
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User with email ${email} already exists. Skipping creation.`);
            return;
        }

        // Buat pengguna baru
        const user = new User({ name, email, password }); // Simpan password langsung
        await user.save();
        console.log(`User : ${name} created successfully`);
    } catch (err) {
        console.error('Error creating user:', err.message);
    }
};

(async () => {
    await connectDB();

    try {
        await createUser('User Biasa', 'cele@gmail.com', 'ya');
    } catch (err) {
        console.error('Error during user creation process:', err.message);
    } finally {
        await mongoose.disconnect(); // Tutup koneksi MongoDB
        console.log('MongoDB connection closed');
    }
})();
