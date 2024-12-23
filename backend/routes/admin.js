const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware');
const {
  getAllCrowdfunds,
  getCrowdfundDetails,
  createCrowdfund,
  editCrowdfund,
  deleteCrowdfund,
  deleteComment,
} = require('../controllers/adminController');

const router = express.Router();

// Admin landing page (fetch all crowdfunds)
router.get('/admin', getAllCrowdfunds);

// Admin detail Crowdfund
router.get('/admin/:id', isAdmin, getCrowdfundDetails);

// Admin create Crowdfund
router.post('/admin/create', createCrowdfund);

// Admin edit Crowdfund
router.put('/admin/:id/edit', isAdmin, editCrowdfund);

// Delete crowdfund
router.delete('/admin/:id', isAdmin, deleteCrowdfund);

// Delete comment
router.delete('/admin/comment/:id', isAdmin, deleteComment);

module.exports = router;
