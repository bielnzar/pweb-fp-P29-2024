const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User'); // Import model User
require('dotenv').config();

// Inisialisasi Express
const app = express();

// Hubungkan ke Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

    const role = email.includes('@admin.com') ? 'admin' : 'user';
    const redirectTo = role === 'admin' ? '/admin' : '/';

    return res.status(200).json({
      message: 'Login successful',
      role,
      redirectTo,
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
