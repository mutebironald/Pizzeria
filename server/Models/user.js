const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const DbInstanceConnections = require('../Database/database')

const dbSingleton = new DbInstanceConnections().getInstance();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'User Model connection error'))

const userSchema = new Schema({
    first_name: { 
        type: String, 
        default : null, 
        required: [true, 'first name is required']
    },
    last_name: { 
        type: String, 
        default: null, 
        required: [true, 'last name is required']
    },
    email: { 
        type: String, 
        unique: 'A user with this email already exists', 
        required: [true, 'Enter your email'] 
    },
    password: { 
        type: String, 
        required: [true, 'A password must be provided'] 
    },
    token: { type: String }
})

userSchema.plugin(require('mongoose-unique-validator'), { type: 'mongoose-unique-validator'});

module.exports = mongoose.model(
    'User',
    userSchema,
    `User${ dbSingleton.getInstanceStatus()}`
);
