const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const feedbackRoutes = require('./routes/feedback');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Koneksi ke Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/feedback', feedbackRoutes);
app.use('/', authRoutes);
app.use(adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
