const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');
const aboutController = require('../controllers/aboutController'); // <-- THIS LINE WAS MISSING

// Home route
router.get('/', homeController.getHome);

// About route
router.get('/about', aboutController.getAbout);

// Menu route
router.get('/restaurants/:id/menu', menuController.getMenuByRestaurant);

// Lab 4 Order Routes
router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrder);
router.post('/orders/:id/update', orderController.updateOrder);
router.post('/orders/:id/cancel', orderController.cancelOrder);

module.exports = router;
