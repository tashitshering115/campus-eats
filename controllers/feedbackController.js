
const Feedback = require('../models/Feedback');
const Restaurant = require('../models/Restaurant');

exports.submitFeedback = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        const restaurant =
            await Restaurant.getRestaurantById(restaurantId);

        if (!restaurant) {
            return res.status(404).send('Restaurant not found.');
        }

        const { customerName, rating, comment } = req.body;
        const numericRating = Number(rating);

        if (
            !customerName ||
            !customerName.trim() ||
            !Number.isInteger(numericRating) ||
            numericRating < 1 ||
            numericRating > 5
        ) {
            return res.status(400).send('Invalid feedback.');
        }

        await Feedback.createFeedback({
            restaurantId,
            customerName: customerName.trim(),
            rating: numericRating,
            comment
        });

        res.redirect(`/restaurants/${restaurantId}/menu`);
    } catch (err) {
        console.error('Feedback submission failed:', err);
        res.status(500).send('Unable to submit feedback.');
    }
};
