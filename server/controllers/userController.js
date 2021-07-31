const User = require('../Models/user');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;

            if (!(email && password && first_name && last_name)) {
                res.status(400).send("All input is required");
            }

            const oldUser = await User.findOne({ email });
            if(oldUser){
                return res.status(409).send("User Already exists. Please Login");
            }

            let encryptedPassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                first_name,
                last_name,
                email: email.trim().toLowerCase(),
                password: encryptedPassword
            });

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.SECRET_KEY,
                {
                    expiresIn: "2h"
                }
            );
            user.token = token;
            res.status(201).json({
                "message": `Hello ${user.first_name}, you have successfully registered proceed to login`
            });
        }catch(err){
            console.log(err)
        }
    },
    loginUser: async (req, res) => {
        try{
            const { email, password} = req.body;
            if(!(email && password)){
                res.status(400).send("All input is required");
            }

            const user = await User.findOne({ email });

            if(user && (await bcrypt.compare(password, user.password))){
                const token = jwt.sign(
                    { user_id: user.id, email },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "2h"
                    }
                );
                user.token = token;

                return res.status(200).json({
                    "message": `Hello ${user.first_name}, you have successfully logged in`,
                    token: user.token
                });
            }
            res.status(400).send("Invalid Credentials");
        }catch(err){
            console.log(err);
        }
    }
}
