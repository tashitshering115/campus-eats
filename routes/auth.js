const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', authController.showSignup);
router.post('/signup', authController.signup);
router.get('/verify/:token', authController.verifyEmail);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/forgot-password', authController.showForgotPassword);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password/:token', authController.showResetPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
