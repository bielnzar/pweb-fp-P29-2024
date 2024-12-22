const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
    try {
        const { name, is_anonymous, email, message } = req.body;

        const feedback = new Feedback({
            name: is_anonymous ? 'anonim' : name,
            is_anonymous,
            email: is_anonymous ? 'anonim' : email,
            message,
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Urutkan berdasarkan terbaru
        res.status(200).json(feedbacks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// (optional, untuk admin mndelete)
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findByIdAndDelete(id);

        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteAllFeedback = async (req, res) => {
    try {
        await Feedback.deleteMany({});
        res.status(200).json({ message: 'All feedback deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};