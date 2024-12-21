const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Redirect berdasarkan email domain
        if (email.includes('@admin.com')) {
            res.status(200).json({ message: 'Redirect to Admin Dashboard', dashboard: 'admin', token });
        } else if (email.includes('@user.com')) {
            res.status(200).json({ message: 'Redirect to User Dashboard', dashboard: 'user', token });
        } else {
            res.status(403).json({ message: 'Access forbidden: Invalid email domain' });
        }
    } 
    catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
