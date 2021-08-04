require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument =  require('../docs');


const { createPizza , getPizzas, updatePizza, deletePizza } = require('../controllers/pizzaController');
const { createOrder, getOrders, getOrderDetails, updateOrder, deleteOrder } = require('../controllers/orderItemController');
// const { getItems } = require('../controllers/orderController');

const { registerUser , loginUser } = require('../controllers/userController')

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));


router.post('/register', registerUser)
router.post('/login', loginUser)

router.post('/pizzas', auth , createPizza)
router.get('/pizzas', getPizzas);
router.put('/pizzas/:id', auth,  updatePizza);
router.delete('/pizzas/:id', auth, deletePizza);

router.post('/orders', auth, createOrder)
router.get('/orders', auth,  getOrders);
router.get('/orders/:id', auth , getOrderDetails);
router.put('/orders/:id', auth, updateOrder);
router.delete('/orders/:id', auth,  deleteOrder);

// router.get('/items', getItems);



module.exports = router;
