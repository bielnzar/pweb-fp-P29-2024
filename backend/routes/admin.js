const express = require('express');
const { protectAdmin } = require('../middleware/authMiddleware');
const {
  getAllCrowdfunds,
  getCrowdfundDetails,
  createCrowdfund,
  editCrowdfund,
  deleteCrowdfund,
  deleteComment,
} = require('../controllers/adminController');

const router = express.Router();

router.get('/admin', protectAdmin, getAllCrowdfunds); // Admin landing page
router.get('/admin/:crowdfund_id', protectAdmin, getCrowdfundDetails); // Admin detail Crowdfund
router.post('/admin/create', protectAdmin, createCrowdfund); // Admin create Crowdfund
router.put('/admin/:crowdfund_id/edit', protectAdmin, editCrowdfund); // Admin edit Crowdfund
router.delete('/admin/:crowdfund_id', protectAdmin, deleteCrowdfund); // Delete crowdfund
router.delete('/admin/comment/:comment_id', protectAdmin, deleteComment); // Delete comment

module.exports = router;


