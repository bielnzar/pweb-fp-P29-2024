const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const jwt = require('jsonwebtoken'); 
const adminRouter = require('./routes/admin');
require('dotenv').config();

const app = express();

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

    const role = email.includes('@admin.com') ? 'admin' : 'user';

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: role },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    const redirectTo = role === 'admin' ? '/admin' : '/';

    return res.status(200).json({
      message: 'Login successful',
      role,
      redirectTo,
      token, 
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));