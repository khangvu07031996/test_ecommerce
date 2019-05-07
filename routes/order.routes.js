const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const all_order_controller = require('../controllers/allOrder.controller');


// a simple test url to check that all of our files are communicating correctly.

router.post('/create',all_order_controller.all_order_create);
router.get('/', all_order_controller.all_order);
router.put('/:id/update', all_order_controller.update_all_order);



module.exports = router;
