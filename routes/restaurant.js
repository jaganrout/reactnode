const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');
router.post("/orders", RestaurantController.postRestaurant);
router.post("/is-order-completed", RestaurantController.postcreateRestaurant);
router.get("/", RestaurantController.createRestaurant);
router.post('/restaurant/postLogin',RestaurantController.postLogin);
router.get("/api/delete/restaurant/:id", RestaurantController.Logout);
module.exports = router;