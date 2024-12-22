const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt: ${email}`); // Tambahkan log email yang digunakan

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found'); // Log jika user tidak ditemukan
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password'); // Log jika password salah
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        // Buat token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error.message); // Tambahkan log untuk error lainnya
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { login };
