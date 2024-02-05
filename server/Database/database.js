require('dotenv').config({ path: '../.env'});
const mongoose = require('mongoose');
const url = process.env.MONGO_DB_URL;

class Database {
    constructor(){
        const connect = mongoose.connect(url, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        });

        connect.then((result) => {
            console.log('Mongoose has established a connection')
        });
    }

    getInstanceStatus(){
        if(process.env.NODE_ENV === 'production')
        {
            return '__production';
        }
        else{
            return '__staging'
        }
    }
}

class Singleton {
    constructor()
    {
        if(!Singleton.instance)
        {
            Singleton.instance = new Database();
        }
    }

    getInstance(){
        return Singleton.instance;
    }
}


module.exports = Singleton;
