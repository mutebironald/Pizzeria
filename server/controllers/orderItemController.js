const mongoose = require('mongoose')
const OrderItemModel = require('../Models/orderItem');
const PizzaModel = require('../Models/pizza');

module.exports = {
    createOrder : async (req, res) => { 
        if(!mongoose.Types.ObjectId.isValid(req.body.pizza_id)){
            return res.status(400).json({ error: 'Enter a valid Pizza id' })
        }

        try{
            let pizza = await PizzaModel.findOne({ _id : req.body.pizza_id });
            if(pizza){
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
                let response = await orderItem.save()
                res.status(201).json({
                    Order: { 
                        name: pizza.name, 
                        price: pizza.price, 
                        quantity: response.quantity, 
                        totalAmount: response.totalAmount,
                        discount
                    } 
                });
            }else {
                return res.status(400).json({ error: 'The Pizza you want to order is inexistent' })
            }
        }catch(err){
            res.status(400).json({ error: err.message })
        }
        
    },
    //list of orders
    getOrders: async(req, res) => {
        OrderItemModel.find((err, orders) => {
            if(err) res.status(400).json({ error : err.message })
            res.status(200).json({ orders, length: orders.length });
        });
    },
    // details of an individual order
    getOrderDetails: async (req, res) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ error: 'Enter a valid Order id' });
        }
        try{
            let order = await OrderItemModel.findOne({_id : req.params.id});
            let pizza = await PizzaModel.findOne({ _id: order.pizza_id });
            if(pizza){
                res.status(200).json({
                    name: pizza.name,
                    price: pizza.price,
                    quantity: order.quantity,
                    totalAmount: order.totalAmount
                })
            }else{
                return res.status(400).json({ error: 'The Pizza is inexistent' })
            }
        }catch(err){
            res.status(500).json({ error: 'The order id passed is incorrect' });
        }
    },

    updateOrder: async (req, res) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ error: 'Enter a valid Order id' });
        }
        let order = await OrderItemModel.findById({ _id : req.params.id});
        if(!order) return res.status(400).json({ error: 'The Order is inexistent' });
        let pizza = await PizzaModel.findOne({ _id: req.body.pizza_id });
        if(!pizza) return res.status(400).json({ error: 'The Pizza is inexistent' })
        let tempTotal = pizza.price * req.body.quantity;
        let discount = 0;
        if(tempTotal > 50 && tempTotal < 100){
            discount = (5/100) * tempTotal;
        }else if(tempTotal >= 100){
            discount = (10/100) * tempTotal;
        }
        let totalAmount = tempTotal - discount;
        await OrderItemModel.findByIdAndUpdate(req.params.id, {
            pizza_id : req.body.pizza_id,
            quantity: req.body.quantity,
            totalAmount
        }, {new: true},  (err, order) => {
            if(err) return res.status(500).json({ error: err.message })
            return res.status(200).json({ 
                order : {
                    pizza_id: order.pizza_id,
                    quantity: order.quantity,
                    totalAmount: tempTotal - discount,
                    discount

                }
            });
        })
    },

    deleteOrder: async (req, res) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ error: 'Enter a valid Order id' });
        }

        try{
            OrderItemModel.findById({_id : req.params.id}, (err, order) => {
                if(!order) return res.status(404).json({ message: "The specific order isn't available" })
            });
            await OrderItemModel.findByIdAndDelete({ _id : req.params.id });
            res.status(200).json({ message: 'Order successfully deleted'})
        }catch(err){
            return res.status(500).json({ error: err.message })
        }
    }
}
