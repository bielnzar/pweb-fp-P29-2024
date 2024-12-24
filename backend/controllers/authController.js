const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Bandingkan password langsung
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user._id, role: user.email.includes('@admin.com') ? 'admin' : 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};
