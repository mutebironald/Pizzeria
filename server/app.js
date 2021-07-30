const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes')

const app = express();

app.use(bodyParser.json({ inflate: true }));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/api', api)

module.exports = app;
