const controller = require('./controller')
const { category, service, description } = require('../db/service');
const { vehicles } = require('../db/vehicle')

const services = () => {
    return {
        async addCategory(req, res) {
            try {
                let data = req.body.data;
                //data.createdBy = req.admin_name
                let checkData = await category.findOne({ category_name: data.category_name, status: true })
                if (checkData) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Category name already added"
                    }, 'service', 400));
                }
                await new category(data).save();
                return res.status(200).send(controller.successFormat({
                    "message:": "Category have been successfully added"
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'service', 400));
            }
        },

        async getCategory(req, res) {
            try {
                if (req.query.category_name) {
                    let checkCategory = await category.find({ category_name: req.query.category_name, status: true });
                    if (checkCategory) {
                        return res.status(200).send(controller.errorMsgFormat({
                            "data:": checkCategory
                        }, 'service', 200));
                    }
                    return res.status(200).send(controller.errorMsgFormat({
                        "data:": []
                    }, 'service', 200));
                }
                let check = await category.find({ status: true });
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
        },

        async updateCategory(req, res) {
            try {
                let data = req.body.data;
                //data.updateBy = req.admin_name
                let checkCategory = await category.findOne({ _id: req.params.category_id })
                if (!checkCategory) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Category Id doesn't exits."
                    }, 'service', 400));
                }
                if (data.category_name) {
                    let checkCategory = await category.findOne({ category_name: data.category_name })
                    if (checkCategory) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message:": "Category name already added"
                        }, 'service', 400));
                    }
                }

                await category.findOneAndUpdate({ _id: req.params.category_id }, data)
                return res.status(200).send(controller.successFormat({
                    "message:": "Category had successfully updated."
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'service', 400));
            }
        },

        async addService(req, res) {
            try {
                let data = req.body.data;
                let checkService;
                //data.createdBy = req.admin_name
                checkService = await service.findOne({ service_name: data.service_name })
                if (!checkService) {
                    checkService = await new service({ service_name: data.service_name }).save()
                }
                let checkCategory = await category.findOne({ category_name: data.category_name })
                if (!checkCategory) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Category doesn't exits."
                    }, 'service', 400));
                }
                let checkVehicle = await vehicles.findOne({ vehicle_cc: data.vehicle_cc, vehicle_name: data.vehicle_name })
                if (!checkVehicle) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Vehicle name doesn't exits on vechile cc"
                    }, 'vehicle', 400));
                }
                let checkDescription = await description.findOne({ description: data.description, service_id: checkService._id, category_id: checkCategory._id, vehicle_id: checkVehicle._id })
                if (checkDescription) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Description already added"
                    }, 'vehicle', 400));
                }
                let payload = {
                    service_id: checkService._id,
                    category_id: checkCategory._id,
                    vehicle_id: checkVehicle._id,
                    description: data.description,
                    price: data.price,
                    tax: data.tax
                }
                await new description(payload).save();
                return res.status(200).send(controller.successFormat({
                    "message:": "Service have been successfully added"
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'service', 400));
            }
        },
        async getService(req, res) {
            try {
                if (req.query.service_name) {
                    let checkService = await service.findOne({ service_name: req.query.service_name })
                    if (!checkService) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message:": "Service doesn't exits."
                        }, 'service', 400));
                    }
                    let checkDescription = await description.find({ service_id: checkService._id })
                        .populate({
                            path: "category_id",
                            select: 'category_name status'
                        })
                        .populate({
                            path: "service_id",
                            select: 'service_name'
                        })
                        .populate({
                            path: "vehicle_id",
                            select: 'vehicle_name vehicle_cc'
                        })
                    if (checkDescription) {
                        return res.status(200).send(controller.errorMsgFormat({
                            "data:": checkDescription
                        }, 'service', 200));
                    }
                    return res.status(200).send(controller.errorMsgFormat({
                        "data:": []
                    }, 'service', 200));
                }
                let check = await description.find({})
                    .populate({
                        path: "category_id",
                        select: 'category_name status'
                    })
                    .populate({
                        path: "service_id",
                        select: 'service_name'
                    })
                    .populate({
                        path: "vehicle_id",
                        select: 'vehicle_name vehicle_cc'
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
        },

        async updateService(req, res) {
            try {
                let data = req.body.data;
                //data.createdBy = req.admin_name
                let checkDescriptionId = await description.findOne({ _id: req.params.description_id })
                if (!checkDescriptionId) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Description id  doesn't exits."
                    }, 'service', 400));
                } if (data.service_name) {
                    let checkService = await service.find({ service_name: data.service_name })
                    if (checkService.length > 0) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message:": "Service already added"
                        }, 'vehicle', 400));
                    }
                    await service.findOneAndUpdate({ _id: checkDescriptionId.service_id }, { service_name: data.service_name })
                }
                let checkDescription = await description.findOne({ description: data.description, service_id: checkDescriptionId.service_id, category_id: checkDescriptionId.category_id, vehicle_id: checkDescriptionId.vehicle_id })
                if (checkDescription) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Description already added"
                    }, 'vehicle', 400));
                }
                await description.findOneAndUpdate({ _id: req.params.description_id }, data)
                return res.status(200).send(controller.successFormat({
                    "message:": "Service  had successfully updated."
                }, 'service', 200));

            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'service', 400));
            }
        }
    }
}
module.exports = services()