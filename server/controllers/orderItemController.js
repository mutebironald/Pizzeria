const OrderItemModel = require('../Models/orderItem');
const PizzaModel = require('../Models/pizza');

//There should be a "Create Order" function, 
//the user can select pizza types and amounts, add to the order, 
//see current total, and place (save) the order.


// pizza_id: { type: ObjectId , ref: 'Pizza' },
// quantity: {
//     type: Number,
//     required : [ true, 'No quantity has been specified'],
//     min : [1, 'Minimum quantity is 1']
// },
// totalAmount: { type: Number, required: true }
module.exports = {
    createOrder : async (req, res) => { 
        PizzaModel.findOne({ _id : req.body.pizza_id })
            .exec()
            .then(pizza => {
                let orderItem = new OrderItemModel({
                    pizza_id: req.body.pizza_id,
                    quantity: req.body.quantity,
                    totalAmount: pizza.price * req.body.quantity
                });
                orderItem.save().then( response => {
                    res.json({ Order: { name: pizza.name, price: pizza.price, quantity: response.quantity, totalAmount: response.totalAmount } });
                }).catch(err => res.status(500).json({ error: err.message }));  
            })
            .catch(err => res.status(500).json({ error: 'The Pizza you want to order is inexistent' }))
        // 
        
    },
    //list of orders
    getOrders: async(req, res) => {
        OrderItemModel.find((err, orders) => {
            if(err) res.status(400).json({ error : err.message })
            res.status(200).json({ orders, length: orders.length });
        });
    },
    // details of an individual order
    getOrderDetails: (req, res) => {
        OrderItemModel.findOne({_id : req.params.id})
            .exec()
            .then(order => {
                PizzaModel.findOne({ _id: order.pizza_id })
                    .exec()
                    .then(pizza => {
                        res.json({
                            name: pizza.name,
                            price: pizza.price,
                            quantity: order.quantity,
                            totalAmount: order.totalAmount
                        })
                    }).catch(err => res.status(500).json({ error: err.message }));
            }).catch(err => res.status(500).json({ error: 'The order id passed is inexistent' }));
    },

}