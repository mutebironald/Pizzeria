const PizzaModel = require('../Models/pizza');
const mongoose = require('mongoose')

module.exports = {
    createPizza : async (req, res) => {
        try{
            let pizza = new PizzaModel({
                name: req.body.name,
                price: req.body.price
            });
            let response = await pizza.save();
            res.status(201).json({
                'message': 'Pizza successfully created',
                pizza:{
                    _id: response._id,
                    name: response.name,
                    price: response.price
                }
            })
        }catch(err){
            res.status(500).json({ errror: err.message })
        }
    },

    getPizzas: async(req, res) => {
        PizzaModel.find((err, pizzas) => {
            if(err) res.status(400).json({ error : err.message })
            res.status(200).json({ pizzas, length: pizzas.length });
        });
    },

    updatePizza: async(req, res) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ error: 'Enter a valid Pizza id' });
        }
        await PizzaModel.findByIdAndUpdate(req.params.id, {name: req.body.name, price: req.body.price}, {new: true},
            function(err, pizza){
                if(err){
                    return res.status(500).json({ error: err.message })
                }
                return res.status(200).json({ pizza })
            }
        )
    },

    deletePizza: async(req, res) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ error: 'Enter a valid Pizza id' });
        }

        let pizza = await PizzaModel.findById({_id : req.params.id });
        if(!pizza) return res.status(404).json({ message: "The specific pizza isn't available" })
        try{
            await PizzaModel.deleteOne({_id : req.params.id })
            res.status(200).json({ message: 'Pizza successfully deleted'})
        }catch(err){
            console.log("error", err)
            return res.status(500).json({ error: err.message })
        }
    }

}
