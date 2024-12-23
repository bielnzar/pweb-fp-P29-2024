const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Simpan password langsung (tidak disarankan)
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' }
});

module.exports = mongoose.model('User', UserSchema);
