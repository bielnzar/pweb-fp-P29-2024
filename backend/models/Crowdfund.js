const mongoose = require('mongoose');

const CrowdfundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    target: { type: Number, required: true },
    current_donation: { type: Number, default: 0 },
    status: { type: String, enum: ['OPEN', 'CLOSE'], required: true },
    favorite_crowdfund: { type: mongoose.Schema.Types.ObjectId, ref: 'FavoriteCrowdfund' },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Crowdfund', CrowdfundSchema);
