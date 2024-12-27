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

router.get('/admin', isAdmin, getAllCrowdfunds); // List crowdfunds
router.get('/admin/:id', isAdmin, getCrowdfundDetails); // Detail crowdfund
router.post('/admin/create', isAdmin, createCrowdfund); // Create crowdfund
router.put('/admin/:id/edit', isAdmin, editCrowdfund); // Edit crowdfund
router.delete('/admin/:id', isAdmin, deleteCrowdfund); // Delete crowdfund
router.delete('/admin/comment/:id', isAdmin, deleteComment); // Delete comment

module.exports = router;
