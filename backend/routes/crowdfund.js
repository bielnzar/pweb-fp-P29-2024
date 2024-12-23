const express = require('express');
const {
  getAllCrowdfunds,
  getCrowdfundDetails,
  donateToCrowdfund,
} = require('../controllers/crowdfundController');
const router = express.Router();

// Rute untuk mendapatkan semua crowdfund
router.get('/', getAllCrowdfunds);

// Rute untuk mendapatkan detail crowdfund
router.get('/:crowdfund_id', getCrowdfundDetails);

// Rute untuk mendonasikan ke crowdfund
router.post('/:crowdfund_id/donate', donateToCrowdfund);

module.exports = router;
