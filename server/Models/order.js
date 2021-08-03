//pizza type and quantity 

//example
// 30 bags of rice

///ORDER: id, [list of order_item represented by order_item_id ]
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const DbInstanceConnections = require('../Database/database')

const dbSingleton = new DbInstanceConnections().getInstance();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Order Model connection error'))

const OrderSchema = new Schema({
    // order_id : { type: ObjectId },
    items: [ { type: ObjectId , ref: 'OrderItem'}]
});

OrderSchema.plugin(require('mongoose-unique-validator'), { type: 'mongoose-unique-validator' });

module.exports = mongoose.model(
    'Order',
    OrderSchema,
    `Order${ dbSingleton.getInstanceStatus()}`
)
