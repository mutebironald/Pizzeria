const express = require('express');
const router = express.Router();

const { createPizza , getPizzas} = require('../controllers/pizzaController');
const { createOrder, getOrders, getOrderDetails } = require('../controllers/orderItemController');
// const { getItems } = require('../controllers/orderController');


router.post('/create/pizza',createPizza)
router.get('/menu/pizzas', getPizzas);

router.post('/create/order', createOrder)
router.get('/orders', getOrders);
router.get('/order/:id', getOrderDetails);

// router.get('/items', getItems);

module.exports = router;
