const OrderItemModel = require('../Models/orderItem');

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
        try{
            let orderItem = new OrderItemModel({
                quantity: req.body.quantity
            });
            let response = await orderItem.save();
            res.json({ Order: response });
        }catch(err){
            res.status(500).json({ error: err.message })
        }
    }
}
