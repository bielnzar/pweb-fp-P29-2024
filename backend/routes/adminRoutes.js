const express = require('express');
const { authenticateAdmin } = require('../middlewares/authmiddleware');
const router = express.Router();

router.use(authenticateAdmin);

router.get('/admin', (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

router.get('/admin/:crowdfund_id', (req, res) => {
  const { crowdfund_id } = req.params;
  res.json({ message: `Details for crowdfund ID ${crowdfund_id}` });
});

router.post('/admin/create', (req, res) => {
  const { name, target } = req.body;
  res.json({ message: 'Crowdfund created', data: { name, target } });
});

module.exports = router;