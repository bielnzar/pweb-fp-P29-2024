const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const jwt = require('jsonwebtoken'); // Import the jwt library
const adminRouter = require('./routes/admin');
require('dotenv').config();

// Inisialisasi Express
const app = express();

// Hubungkan ke Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api', adminRouter);

// Rute Login
app.post('/login', async (req, res) => {
  console.log('Login route accessed');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create JWT token with user data (e.g., user ID)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Secret key (store this securely in your .env)
      { expiresIn: '1h' } // Token expiration (optional)
    );

    // Determine the role
    const role = email.includes('@admin.com') ? 'admin' : 'user';
    const redirectTo = role === 'admin' ? '/admin' : '/';

    return res.status(200).json({
      message: 'Login successful',
      role,
      redirectTo,
      token, // Send the token in the response
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Middleware Penanganan Rute Tidak Ditemukan
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
