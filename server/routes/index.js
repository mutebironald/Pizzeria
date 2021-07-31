require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');


const { createPizza , getPizzas} = require('../controllers/pizzaController');
const { createOrder, getOrders, getOrderDetails } = require('../controllers/orderItemController');
// const { getItems } = require('../controllers/orderController');

const { registerUser , loginUser } = require('../controllers/userController')


router.post('/register', registerUser)
router.post('/login', loginUser)

router.post('/pizzas', auth , createPizza)
router.get('/pizzas', getPizzas);

router.post('/orders', createOrder)
router.get('/orders', auth,  getOrders);
router.get('/orders/:id', auth , getOrderDetails);

// router.get('/items', getItems);



module.exports = router;
