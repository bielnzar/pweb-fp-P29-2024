const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.email.endsWith('@admin.com')) {
            return res.status(403).json({ message: 'Forbidden: Admins only!' });
        }

        req.user = decoded; // Simpan data user ke request
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: 'Unauthorized access!' });
    }
};

module.exports = { authenticateAdmin };
