const jwt = require('jsonwebtoken');

exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user = decoded; // Simpan data pengguna di req
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};