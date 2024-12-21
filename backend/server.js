const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');
const authRoutes = require('./routes/auth');

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/feedback', feedbackRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
