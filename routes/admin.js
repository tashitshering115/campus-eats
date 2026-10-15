const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/admin/dashboard', requireAdmin, adminController.showDashboard);
router.post('/admin/menu', requireAdmin, adminController.addMenuItem);

module.exports = router;
