const OrderItemModel = require('../Models/orderItem');
const PizzaModel = require('../Models/pizza');

module.exports = {
    createOrder : async (req, res) => { 
        PizzaModel.findOne({ _id : req.body.pizza_id })
            .exec()
            .then(pizza => {
                let tempTotal = pizza.price * req.body.quantity;
                let discount = 0;
                if(tempTotal > 50 && tempTotal < 100){
                    discount = (5/100) * tempTotal;
                }else if(tempTotal >= 100){
                    discount = (10/100) * tempTotal;
                }
                let orderItem = new OrderItemModel({
                    pizza_id: req.body.pizza_id,
                    quantity: req.body.quantity,
                    totalAmount: tempTotal - discount
                });
                orderItem.save().then( response => {
                    res.status(201).json({
                        Order: { 
                            name: pizza.name, 
                            price: pizza.price, 
                            quantity: response.quantity, 
                            totalAmount: response.totalAmount,
                            discount
                        } 
                    });
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
                        res.status(200).json({
                            name: pizza.name,
                            price: pizza.price,
                            quantity: order.quantity,
                            totalAmount: order.totalAmount
                        })
                    }).catch(err => res.status(500).json({ error: err.message }));
            }).catch(err => res.status(500).json({ error: 'The order id passed is inexistent' }));
    },

    //future additions include the ability to update an order, delete an order

}
