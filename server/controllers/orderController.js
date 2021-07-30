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
        
    }
}
