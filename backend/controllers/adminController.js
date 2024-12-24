const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Crowdfund = require('../models/Crowdfund');
const Comment = require('../models/Comment');

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// 1. Get all crowdfunds
exports.getAllCrowdfunds = async (req, res) => {
  try {
    const crowdfunds = await Crowdfund.find().sort({ createdAt: -1 });
    res.status(200).json(crowdfunds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching crowdfunds', error: err.message });
  }
};

// 2. Get crowdfund details
exports.getCrowdfundDetails = async (req, res) => {
  const { id } = req.params;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Crowdfund ID format' });
  }

  try {
    // Fetch crowdfund details with populated comments
    const crowdfund = await Crowdfund.findById(id).populate('comments');
    console.log('Crowdfund fetched:', crowdfund); // Debug log

    if (!crowdfund) {
      return res.status(404).json({ message: 'Crowdfund not found' });
    }

    res.status(200).json(crowdfund);
  } catch (err) {
    console.error('Error fetching crowdfund details:', err); // Debug log
    res.status(500).json({ message: 'Error fetching crowdfund details', error: err.message });
  }
};

// 3. Create crowdfund
exports.createCrowdfund = async (req, res) => {
  const { name, target, createdBy } = req.body;

  // Periksa apakah semua data yang diperlukan ada
  if (!name || !target || !createdBy) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newCrowdfund = new Crowdfund({
      name,
      target,
      createdBy,
      currentDonation: 0, // Set default current donation to 0
      status: 'OPEN', // Set default status to OPEN
    });

    // Simpan crowdfund ke database
    await newCrowdfund.save();
    res.status(201).json(newCrowdfund);
  } catch (err) {
    res.status(500).json({ message: 'Error creating crowdfund', error: err.message });
  }
};

// 4. Edit crowdfund
exports.editCrowdfund = async (req, res) => {
  const { id } = req.params;
  const { name, target, status } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const updatedCrowdfund = await Crowdfund.findByIdAndUpdate(
      id,
      { name, target, status },
      { new: true } // Mengambil data terbaru setelah update
    );
    if (!updatedCrowdfund) return res.status(404).json({ message: 'Crowdfund not found' });
    res.status(200).json(updatedCrowdfund);
  } catch (err) {
    res.status(500).json({ message: 'Error updating crowdfund', error: err.message });
  }
};

// 5. Delete crowdfund
exports.deleteCrowdfund = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deletedCrowdfund = await Crowdfund.findByIdAndDelete(id);
    if (!deletedCrowdfund) return res.status(404).json({ message: 'Crowdfund not found' });
    res.status(200).json({ message: 'Crowdfund deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting crowdfund', error: err.message });
  }
};

// 6. Delete comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
};
