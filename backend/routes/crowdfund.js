const express = require('express');
const {
  getAllCrowdfunds,
  getCrowdfundDetails,
  donateToCrowdfund,
} = require('../controllers/crowdfundController');
const router = express.Router();

router.get('/', getAllCrowdfunds);

router.get('/:id', getCrowdfundDetails);

router.post('/:id/donate', donateToCrowdfund);

module.exports = router;
