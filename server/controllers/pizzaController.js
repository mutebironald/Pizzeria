const PizzaModel = require('../Models/pizza');

module.exports = {
    createPizza : async (req, res) => {
        try{
            let pizza = new PizzaModel({
                name: req.body.name,
                price: req.body.price
            });
            let response = await pizza.save();
            res.json({ 'message': 'Pizza successfully created', Pizza:response })
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
    //could add the update and deletion of pizza offerings.
}
