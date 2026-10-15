
const express = require('express');
const router = express.Router();

// ========================================
// 1. Controllers
// ========================================
const homeController = require('../controllers/homeController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');
const aboutController = require('../controllers/aboutController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const superAdminController = require('../controllers/superAdminController');
const feedbackController = require('../controllers/feedbackController');

// ========================================
// 2. MongoDB Connection
// ========================================
const { connectMongo } = require('../config/mongo');

// ========================================
// 3. Authentication Middleware
// ========================================
const {
    requireAuth,
    requireAdmin,
    requireSuperAdmin
} = require('../middleware/auth');

// ========================================
// 4. Home Route
// ========================================
router.get('/', homeController.getHome);

// ========================================
// 5. About Route
// ========================================
router.get('/about', aboutController.getAbout);

// ========================================
// 6. Menu Route
// ========================================
router.get(
    '/restaurants/:id/menu',
    menuController.getMenuByRestaurant
);

// ========================================
// 7. MongoDB Test Route (Temporary)
// ========================================
router.get('/mongo-test', async (req, res) => {
    try {
        const db = await connectMongo();
        const collections = await db.listCollections().toArray();

        res.json({
            connected: true,
            collections: collections.map(c => c.name)
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            connected: false,
            error: 'MongoDB connection failed'
        });
    }
});

// ========================================
// 8. Feedback Route (Public)
// ========================================
router.post(
    '/restaurants/:id/feedback',
    feedbackController.submitFeedback
);

// ========================================
// 9. Authentication Routes
// ========================================
router.get('/signup', authController.showSignup);
router.post('/signup', authController.signup);

router.get('/verify/:token', authController.verifyEmail);

router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get(
    '/forgot-password',
    authController.showForgotPassword
);
router.post(
    '/forgot-password',
    authController.forgotPassword
);

router.get(
    '/reset-password/:token',
    authController.showResetPassword
);
router.post(
    '/reset-password/:token',
    authController.resetPassword
);

// ========================================
// 10. Admin Dashboard Routes
// ========================================
router.get(
    '/admin/dashboard',
    requireAdmin,
    adminController.dashboard
);
router.post(
    '/admin/menu',
    requireAdmin,
    adminController.addMenuItem
);

// ========================================
// 11. Super Admin Routes
// ========================================
router.get(
    '/superadmin/dashboard',
    requireSuperAdmin,
    superAdminController.dashboard
);
router.post(
    '/superadmin/restaurants',
    requireSuperAdmin,
    superAdminController.addRestaurant
);
router.post(
    '/superadmin/restaurants/:id/remove',
    requireSuperAdmin,
    superAdminController.removeRestaurant
);
router.post(
    '/superadmin/grant-admin',
    requireSuperAdmin,
    superAdminController.grantAdmin
);

// ========================================
// 12. Order Routes
// ========================================
router.post(
    '/orders',
    requireAuth,
    orderController.createOrder
);
router.get('/orders/:id', orderController.getOrder);
router.post('/orders/:id/update', orderController.updateOrder);
router.post('/orders/:id/cancel', orderController.cancelOrder);

// ========================================
// 13. Export Router
// ========================================
module.exports = router;

