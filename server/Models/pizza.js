//name
//price
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const DbInstanceConnections = require('../Database/database')

const dbSingleton = new DbInstanceConnections().getInstance();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Pizza Model connection error'))


const PizzaSchema = new Schema({
    _id: { type : ObjectId , unique: 'A Pizza with that id already exists'},
    name: { 
        type: String,
        unique: 'A Pizza with the name ({VALUE}) already exists' ,
        required: [true, 'A Pizza must have a name'],
        minlength: 4,
        maxlength : 200
    },
    price: {
        type: Number,
        required: [true, 'Price is empty'],
        min : [1, 'Must be atleast 1']
    }
});

PizzaSchema.plugin(require('mongoose-unique-validator'), { type: 'mongoose-unique-validator'});

module.exports = mongoose.model(
    'Pizza',
    PizzaSchema,
    `Pizza${ dbSingleton.getInstanceStatus()}`
);
