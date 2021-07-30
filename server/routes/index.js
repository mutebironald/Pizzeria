const express = require('express');
const router = express.Router();

const { createPizza , getPizzas} = require('../controllers/pizzaController');
const { createOrder } = require('../controllers/orderController');


router.post('/create/pizza',createPizza)
router.get('/menu/pizzas', getPizzas);

router.post('/create/order', createOrder)

module.exports = router;
