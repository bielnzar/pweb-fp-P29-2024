const Crowdfund = require('../models/Crowdfund');
const Comment = require('../models/Comment');

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
  const { crowdfund_id } = req.params;
  try {
    const crowdfund = await Crowdfund.findById(crowdfund_id).populate('comments');
    if (!crowdfund) return res.status(404).json({ message: 'Crowdfund not found' });
    res.status(200).json(crowdfund);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching crowdfund details', error: err.message });
  }
};

// 3. Create crowdfund
exports.createCrowdfund = async (req, res) => {
  const { name, target } = req.body;
  const adminName = req.user.name; // Assume admin's name is stored in req.user
  try {
    const newCrowdfund = new Crowdfund({
      name,
      target,
      currentDonation: 0,
      status: 'OPEN',
      createdBy: adminName,
    });
    await newCrowdfund.save();
    res.status(201).json(newCrowdfund);
  } catch (err) {
    res.status(500).json({ message: 'Error creating crowdfund', error: err.message });
  }
};

// 4. Edit crowdfund
exports.editCrowdfund = async (req, res) => {
  const { crowdfund_id } = req.params;
  const { name, target, status } = req.body;
  try {
    const updatedCrowdfund = await Crowdfund.findByIdAndUpdate(
      crowdfund_id,
      { name, target, status },
      { new: true }
    );
    if (!updatedCrowdfund) return res.status(404).json({ message: 'Crowdfund not found' });
    res.status(200).json(updatedCrowdfund);
  } catch (err) {
    res.status(500).json({ message: 'Error updating crowdfund', error: err.message });
  }
};

// 5. Delete crowdfund
exports.deleteCrowdfund = async (req, res) => {
  const { crowdfund_id } = req.params;
  try {
    const deletedCrowdfund = await Crowdfund.findByIdAndDelete(crowdfund_id);
    if (!deletedCrowdfund) return res.status(404).json({ message: 'Crowdfund not found' });
    res.status(200).json({ message: 'Crowdfund deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting crowdfund', error: err.message });
  }
};

// 6. Delete comment
exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(comment_id);
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
};
