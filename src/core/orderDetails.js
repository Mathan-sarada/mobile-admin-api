const controller = require('./controller')
require('../db/product_details');
const { orderDetails } = require('../db/order_details')
const { vendor } = require('../db/vendor')
const accountSid = 'AC52e7294da41ece238d49399ca869f095';
const authToken = 'af53e68e1e0038b9130a5c9ad7491e4e';
const client = require('twilio')(accountSid, authToken);

const orderDetail = () => {
    return {
        async getOrderDetails(req, res) {
            try {
                if (req.query.order_id) {
                    let checkOrder = await orderDetails.findOne({ _id: req.query.order_id })
                        .populate({
                            path: 'product_id',
                            select: 'total_amount total_tax description service_id vehicle_id'
                        })
                    if (checkOrder) {
                        return res.status(200).send(controller.successFormat({
                            "message": [checkOrder]
                        }, 'order', 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "message": []
                    }, 'order', 200));
                }
                let check = await orderDetails.find({}).populate({
                    path: 'product_id',
                    select: 'total_amount total_tax description service_id vehicle_id'
                })
                if (check) {
                    return res.status(200).send(controller.successFormat({
                        "message": check
                    }, 'order', 200));
                }
                return res.status(200).send(controller.successFormat({
                    "message": []
                }, 'order', 200));
            }
            catch (err) {
                return res.status(400).send(controller.successFormat({
                    "message": err.message
                }, 'order', 400));
            }

        },
        async sendMessage(req, res) {
            try {
                let data = req.body.data;
                let checkOrderDetials = await orderDetails.findOne({ _id: req.params.order_id });
                if (!checkOrderDetials) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Order Id doesn't exits"
                    }));
                }
                if (checkOrderDetials.isVerified) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Order is already verified"
                    }));
                }
                let checkNumber = await vendor.findOne({ mobile: data.mobile_number })
                if (!checkNumber) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Mobile Number doesn't exits on vendor list"
                    }));
                }
                await client.messages
                    .create({
                        body: `Baallalalal`,
                        from: '+1 408 703 5694',
                        to: `+91${data.mobile_number}`
                    })
                checkOrderDetials.isVerified = true;
                checkOrderDetials.vendor_email = checkNumber.email
                checkOrderDetials.save()
                return res.status(200).send(controller.successFormat({
                    'message': "An Message has been sent to vendor mobile number."
                }, 200))
                    
            } catch (err) {
                return res.status(400).send(controller.successFormat({
                    "message": err.message
                }, 'order', 400));
            }


        }

    }
}

module.exports = orderDetail();