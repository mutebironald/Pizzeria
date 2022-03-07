const orders = require("./orders");
const specificOrder = require("./orders/specificOrder");
const pizzas = require("./pizzas");
const specificPizzas = require("./pizzas/specificPizzas");
const loginUser = require("./users/loginUser");
const registerUser = require("./users/registerUser");

module.exports = {
    paths: {
        '/register': registerUser,
        '/login' : loginUser,
        '/pizzas' : pizzas,
        '/pizzas/{id}' : specificPizzas,
        '/orders' : orders,
        '/orders/{id}' : specificOrder,
    }
}
