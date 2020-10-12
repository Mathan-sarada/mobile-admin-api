const controller = require('./controller')
require('../db/product_details');
const { orderDetails } = require('../db/order_details')
const orderDetail = () => {
    return {
        async getOrderDetails(req, res) {
            try {
                if (req.query.order_id) {
                    let checkOrder = await orderDetails.findOne({ _id: req.query.order_id })
                        .populate({
                            path: 'product_id',
                            select :'total_amount total_tax description service_id vehicle_id'
                        })
                    if (checkOrder) {
                        return res.status(200).send(controller.errorMsgFormat({
                            "data:": [checkOrder]
                        }, 'service', 200));
                    }
                    return res.status(200).send(controller.errorMsgFormat({
                        "data:": []
                    }, 'service', 200));
                }
                let check = await orderDetails.find({}).populate({
                    path: 'product_id',
                    select :'total_amount total_tax description service_id vehicle_id'
                })
                if (check) {
                    return res.status(200).send(controller.errorMsgFormat({
                        "data:": check
                    }, 'service', 200));
                }
                return res.status(200).send(controller.errorMsgFormat({
                    "data:": []
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'service', 400));
            }

        }

    }
}

module.exports = orderDetail();