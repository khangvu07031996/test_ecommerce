const express = require('express');
const bodyParser = require('body-parser');
const orders = require('./routes/order.routes'); // Imports routes for the products
const app = express();
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://someuser:k07031996@ds151626.mlab.com:51626/test_ecomerce';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/orders', orders);
let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});