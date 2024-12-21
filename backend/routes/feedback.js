const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedbackController');

// Submit Feedback
router.post('/', submitFeedback);

// Get All Feedbacks (Optional)
router.get('/', getAllFeedbacks);

module.exports = router;