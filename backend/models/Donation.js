const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    payment_method: { type: String, enum: ['QRIS', 'BANK_TRANSFER'], required: true },
    amount: { type: Number, required: true },
});

module.exports = mongoose.model('Donation', DonationSchema);
