const PizzaModel = require('../Models/pizza');

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
    }

    //potential additions
    //could add the update and deletion of pizza offerings.
    //in the update, i would query the model by id passed via query param and update the record

    //in deletion, i would query the model by id , if present i proceed with the deletion
}
