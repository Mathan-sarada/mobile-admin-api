const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const validation = require('../validation/details.validation');

const orderDetail = require('../core/orderDetails')

router.get('/', async (req, res) => {
    try {
        orderDetail.getOrderDetails(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

router.post('/vendor/message/:order_id', async (req, res) => {
    try {
        let { error } = await validation.vendorMessage(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "service", 400));
        }
        orderDetail.sendMessage(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});


module.exports = router;