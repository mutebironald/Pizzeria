if(process.env.NODE_ENV !== 'production') require('dotenv').config({path: '../.env'});

const port = process.env.PORT || 3000;

const app = require('./app');

app.listen(port, (req, res) => console.log('Server started at port: ', port))
