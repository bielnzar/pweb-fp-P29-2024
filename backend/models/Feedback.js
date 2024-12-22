const mongoose = require('mongoose');
const moment = require('moment-timezone');

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: false },
    is_anonymous: { type: Boolean, default: false },
    email: { type: String, required: false },
    message: { type: String, required: true },
    createdAt: {
        type: String,
        default: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Format WIB
    },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
