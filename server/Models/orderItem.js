//ORDER_ITEM : id, pizza_type(pizza_id), quantity, totalAMt
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const DbInstanceConnections = require('../Database/database')

const dbSingleton = new DbInstanceConnections().getInstance();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'OrderItem Model connection error'))


const OrderItemSchema = new Schema({
    // id : { type: ObjectId },
    pizza_id: { type: ObjectId , ref: 'Pizza' },
    quantity: {
        type: Number,
        required : [ true, 'No quantity has been specified'],
        min : [1, 'Minimum quantity is 1']
    },
    totalAmount: { type: Number, required: true }
})
OrderItemSchema.plugin(require('mongoose-unique-validator'), { type: 'mongoose-unique-validator' });

module.exports = mongoose.model(
    'OrderItem',
    OrderItemSchema,
    `OrderItem${ dbSingleton.getInstanceStatus()}`
);
