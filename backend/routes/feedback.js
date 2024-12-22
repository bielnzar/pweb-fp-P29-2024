const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks, deleteFeedback, deleteAllFeedback } = require('../controllers/feedbackController');

// Submit Feedback
router.post('/', submitFeedback);

// Get All Feedbacks (Optional)
router.get('/', getAllFeedbacks);

router.delete('/:id', deleteFeedback);

router.delete('/', deleteAllFeedback);

module.exports = router;