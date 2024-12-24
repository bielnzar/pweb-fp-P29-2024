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

router.get('/admin', isAdmin, getAllCrowdfunds);
router.get('/admin/:id', isAdmin, getCrowdfundDetails);
router.post('/admin/create', isAdmin, createCrowdfund);
router.put('/admin/:id/edit', isAdmin, editCrowdfund);
router.delete('/admin/:id', isAdmin, deleteCrowdfund);
router.delete('/admin/comment/:id', isAdmin, deleteComment);

module.exports = router;
