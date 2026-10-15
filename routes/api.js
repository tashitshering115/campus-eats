const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { requireAuthApi } = require('../middleware/auth');

router.get('/restaurants', apiController.getRestaurants);
router.get('/restaurants/:id/menu', apiController.getRestaurantMenu);
router.get('/orders/:id', apiController.getOrder);
router.post('/orders', apiController.createOrder);
router.get('/stats', apiController.getStats);

// Protected order creation for API
router.post('/orders', requireAuthApi, apiController.createOrder);

module.exports = router;

