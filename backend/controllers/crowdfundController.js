const Crowdfund = require('../models/Crowdfund');

// 1. Mendapatkan semua crowdfund
exports.getAllCrowdfunds = async (req, res) => {
  try {
    const crowdfunds = await Crowdfund.find({ status: 'OPEN' }).sort({ createdAt: -1 });
    res.status(200).json(crowdfunds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching crowdfunds', error: err.message });
  }
};

// 2. Mendapatkan detail crowdfund
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

// 3. Donasi ke crowdfund
exports.donateToCrowdfund = async (req, res) => {
  const { crowdfund_id } = req.params;
  const { amount } = req.body;
  try {
    const crowdfund = await Crowdfund.findById(crowdfund_id);
    if (!crowdfund) return res.status(404).json({ message: 'Crowdfund not found' });

    // Perbarui total donasi
    crowdfund.currentDonation += amount;

    // Periksa apakah target tercapai
    if (crowdfund.currentDonation >= crowdfund.target) {
      crowdfund.status = 'CLOSE';
    }

    await crowdfund.save();
    res.status(200).json({ message: 'Donation successful', crowdfund });
  } catch (err) {
    res.status(500).json({ message: 'Error processing donation', error: err.message });
  }
};
