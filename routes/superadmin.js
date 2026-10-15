const express = require('express');
const router = express.Router();
const { requireSuperAdmin } = require('../middleware/auth');
const superadminController = require('../controllers/superadminController');

router.get('/superadmin/dashboard', requireSuperAdmin, superadminController.showDashboard);
router.post('/superadmin/users/:id/role', requireSuperAdmin, superadminController.updateUserRole);


module.exports = router;