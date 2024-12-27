const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Crowdfund schema
const CrowdfundSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    target: {
      type: Number,
      required: [true, 'Target amount is required'],
      min: [0, 'Target amount cannot be negative'],
    },
    currentDonation: {
      type: Number,
      default: 0,
      min: [0, 'Current donation cannot be negative'],
    },
    status: {
      type: String,
      enum: ['OPEN', 'CLOSED'],
      default: 'OPEN',
    },
    createdBy: {
      type: String,
      required: [true, 'Creator email is required'],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Crowdfund', CrowdfundSchema);
