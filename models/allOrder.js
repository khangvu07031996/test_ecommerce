const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let allOrderSchema = new Schema({
    order_code : {type : String, required:true, max: 100},
    time : {type:Date,default:Date.now},
    product: [{name : String,price : Number,variant : String}],
    customer:{name : String, email : String , phoneNumber : String, country :String },
    order_status: {type:String},
    shipping : {shipping_type:String, price:Number},
    note : {type:String}
});

// Export the model
module.exports = mongoose.model('allOrder', allOrderSchema);