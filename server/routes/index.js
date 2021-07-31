const express = require('express');
const router = express.Router();

const { createPizza , getPizzas} = require('../controllers/pizzaController');
const { createOrder, getOrders, getOrderDetails } = require('../controllers/orderItemController');
// const { getItems } = require('../controllers/orderController');


router.post('/pizzas', createPizza)
router.get('/pizzas', getPizzas);

router.post('/orders', createOrder)
router.get('/orders',  getOrders);
router.get('/orders/:id', getOrderDetails);

// router.get('/items', getItems);

module.exports = router;
