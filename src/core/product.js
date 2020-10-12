const controller = require('./controller')
const { productDetails } = require('../db/product_details');
const { vehicles } = require('../db/vehicle')
const { description, service } = require('../db/service')

const productDetail = () => {
    return {
        async addProduct(req, res) {
            try {
                let data = req.body.data;
                let checkData = await vehicles.findOne({ vehicle_name: data.vehicle_name, vehicle_cc: data.vehicle_cc })
                if (!checkData) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Vehicle Name or CC doesn't exit"
                    }, 'product-details', 400));
                }
                let checkService = await service.findOne({ service_name: data.service_name })
                if (!checkService) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": " Service Name doesn't exit"
                    }, 'product-details', 400));
                }

                let checkDescription = await description.findOne({ service_id: checkService._id, vehicle_id: checkData._id })
                if (!checkDescription) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Service Description doesn't exit"
                    }, 'product-details', 400));
                }
                let addPriceAndTax = await description.aggregate([
                    {
                        $match:
                        {
                            service_id: checkService._id,
                            vehicle_id: checkData._id
                        }
                    },
                    {
                        $group: {
                            _id: '$service_id',
                            totalPrice: { $sum: '$price' },
                            totalTax: { $sum: '$tax' },
                            description: { $push: '$description' }
                        }
                    }
                ]).exec()
                let payload = {
                    total_amount: addPriceAndTax[0].totalPrice,
                    total_tax: addPriceAndTax[0].totalTax,
                    service_id: checkService._id,
                    vehicle_id: checkData._id
                }
                payload.total_amount += payload.total_tax
                let savePayload = await new productDetails(payload).save();
                payload.description = addPriceAndTax[0].description
                payload.productId = savePayload._id
                return res.status(200).send(controller.successFormat({
                    "data:": payload
                }, 'product-details', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'product-details', 400));
            }
        }
    }
}
module.exports = productDetail()