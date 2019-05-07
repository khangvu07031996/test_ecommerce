const AllOrder = require('../models/allOrder');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.all_order_create = function (req, res) {
    let allorder = new AllOrder(
        {
            order_code : req.body.order_code,
            time : req.body.time,
            product: req.body.product,
            customer:req.body.customer,
            order_status: req.body.order_status,
            shipping : req.body.shipping,
            note : req.body.note
        }
    );

    allorder.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Order Created successfully')
    })
};
exports.all_order = async function(req,res){
    let filters = req.query;
    filters.page = filters.page || 1;
    filters.page_size = filters.page_size || 25;
    let data ;
    let count;
    if(filters.order_status){
        data = await AllOrder.find({order_status:filters.order_status}).skip((filters.page - 1) * filters.page_size).limit(filters.page_size);
        count = await AllOrder.countDocuments({order_status:filters.order_status});

    } else{
        data = await AllOrder.find().skip((filters.page - 1) * filters.page_size).limit(filters.page_size);
        count = await AllOrder.countDocuments();
    }
    
    let respone = {
        data : data,
        pading:{
            'page':filters.page,
            'page_size':filters.page_size,
            'total':count
        }
    }
    return res.send(respone);
}
exports.update_all_order = async function(req,res){
    try{
        let data = await AllOrder.findById(req.params.id).exec();
        data.set(req.body);
        let result = await data.save();
        res.send(result);
    } catch (err){
        res.status(500).send(err);
    }
}