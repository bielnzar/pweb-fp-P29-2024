const mongoose = require('mongoose');

const crowdfundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  target: { type: Number, required: true },
  currentDonation: { type: Number, default: 0 },
  status: { type: String, enum: ['OPEN', 'CLOSE'], default: 'OPEN' },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Crowdfund', crowdfundSchema);
