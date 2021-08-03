const orders = require("./orders");
const getSpecificOrder = require("./orders/getSpecificOrder");
const pizzas = require("./pizzas");
const loginUser = require("./users/loginUser");
const registerUser = require("./users/registerUser");

module.exports = {
    paths: {
        '/register': registerUser,
        '/login' : loginUser,
        '/pizzas' : pizzas,
        '/orders' : orders,
        '/orders/{id}' : getSpecificOrder
    }
}
