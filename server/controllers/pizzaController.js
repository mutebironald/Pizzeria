const mongoose = require('mongoose');
const PizzaModel = require('../Models/pizza');

module.exports = {
    createPizza : async (req, res) => {
        // //address this later 
        // let errors = {};
        // if(!req.body.name){ errors.name = 'A Pizza must have a name'}
        // if(!req.body.price){ errors.price = 'Price is empty' }
        // if(!Object.keys(errors).length) return res.status(400).json({ errors });



        try{
            let pizza = new PizzaModel({
                name: req.body.name,
                price: req.body.price
            });
            let response = await pizza.save();
            res.json({ response })
        }catch(err){
            res.status(500).json({ errror: err })
        }
    },

    getPizzas: async(req, res) => {
        PizzaModel.find((err, pizzas) => {
            if(err) res.status(400).json({ error : err })
            res.status(200).json({ pizzas });
        });
    }
    //could add the update and deletion of pizza offerings.
}
