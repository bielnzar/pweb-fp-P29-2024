const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definisi schema untuk User
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware untuk hashing password sebelum menyimpan ke database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Jika password tidak diubah, lanjutkan proses
    try {
        const salt = await bcrypt.genSalt(10); // Membuat salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        next(error); // Lemparkan error jika ada masalah
    }
});

// Metode untuk memeriksa validitas password
UserSchema.methods.isPasswordValid = async function (password) {
    return bcrypt.compare(password, this.password); // Bandingkan password plaintext dengan hash
};

// Ekspor model User
module.exports = mongoose.model('User', UserSchema);
