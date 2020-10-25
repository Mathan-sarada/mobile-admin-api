const controller = require('./controller')
const { category, service, description, location } = require('../db/service');
const { vehicles } = require('../db/vehicle')

const services = () => {
    return {
        async addCategory(req, res) {
            try {
                let data = req.body.data;
                data.createdBy = req.admin_name
                let checkData = await category.findOne({ category_name: data.category_name, status: true })
                if (checkData) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Category name already added"
                    }, 'service', 400));
                }
                await new category(data).save();
                return res.status(200).send(controller.successFormat({
                    "message": "Category have been successfully added"
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async getCategory(req, res) {
            try {
                if (req.query.category_name) {
                    let checkCategory = await category.find({ category_name: req.query.category_name, status: true });
                    if (checkCategory) {
                        return res.status(200).send(controller.successFormat({
                            "message": checkCategory
                        }, 'service', 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "message": []
                    }, 'service', 200));
                }
                let check = await category.find({ status: true });
                if (check) {
                    return res.status(200).send(controller.successFormat({
                        "message": check
                    }, 'service', 200));
                }
                return res.status(200).send(controller.successFormat({
                    "message": []
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.successFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async updateCategory(req, res) {
            try {
                let data = req.body.data;
                data.updateBy = req.admin_name
                let checkCategory = await category.findOne({ _id: req.params.category_id })
                if (!checkCategory) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Category Id doesn't exits."
                    }, 'service', 400));
                }
                if (data.category_name) {
                    let checkCategory = await category.findOne({ category_name: data.category_name })
                    if (checkCategory) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "Category name already added"
                        }, 'service', 400));
                    }
                }

                await category.findOneAndUpdate({ _id: req.params.category_id }, data)
                return res.status(200).send(controller.successFormat({
                    "message": "Category had successfully updated."
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async addService(req, res) {
            try {
                let data = req.body.data;
                let payload
                data.createdBy = req.admin_name
                let checkCategory = await category.findOne({ category_name: data.category_name })
                if (!checkCategory) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Category doesn't exits."
                    }, 'service', 400));
                }
                if (req.query.type == 'bike') {
                    let checkVehicle = await vehicles.findOne({ vehicle_cc: data.vehicle_cc })
                    if (!checkVehicle) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "Vehicle cc doesn't exits "
                        }, 'service', 400));
                    }
                    let checkService = await service.findOne({ service_name: data.service_name, vehicle_id: checkVehicle._id })
                    if (checkService) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "Service already added on vehicle cc"
                        }, 'service', 400));
                    }
                    payload = {
                        service_name: data.service_name,
                        category_id: checkCategory._id,
                        vehicle_id: checkVehicle._id,
                        description: data.description,
                        price: data.price,
                        service_type: req.query.type
                    }
                }
                else {
                    let checkService = await service.findOne({ service_name: data.service_name})
                    if (checkService) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "Service already added"
                        }, 'service', 400));
                    }
                    payload = {
                        service_name: data.service_name,
                        category_id: checkCategory._id,
                        description: data.description,
                        price: data.price,
                        service_type: req.query.type
                    }
                }
                await new service(payload).save();
                return res.status(200).send(controller.successFormat({
                    "message": "Service have been successfully added"
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },
        async getService(req, res) {
            try {
                let check = await service.find({})
                    .populate({
                        path: "category_id",
                        select: 'category_name status'
                    })
                if (check) {
                    return res.status(200).send(controller.successFormat({
                        "message": check
                    }, 'service', 200));
                }
                return res.status(200).send(controller.successFormat({
                    "message": []
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async updateService(req, res) {
            try {
                let data = req.body.data;
                data.createdBy = req.admin_name
                let checkServiceId = await service.findOne({ _id: req.params.service_id })
                if (!checkServiceId) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Service id  doesn't exits."
                    }, 'service', 400));
                } if (data.service_name) {
                    let checkService = await service.find({ service_name: data.service_name })
                    if (checkService.length > 0) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "Service already added"
                        }, 'service', 400));
                    }
                }
                await service.findOneAndUpdate({ _id: req.params.service_id }, data)
                return res.status(200).send(controller.successFormat({
                    "message": "Service had successfully updated."
                }, 'service', 200));

            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },
        async addLocation(req, res) {
            try {
                let data = req.body.data;
                data.createdBy = req.admin_name
                let checkData = await location.findOne({ location: data.location, status: true })
                if (checkData) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Location already added"
                    }, 'service', 400));
                }
                await new location(data).save();
                return res.status(200).send(controller.successFormat({
                    "message": "Location have been successfully added"
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async getLocation(req, res) {
            try {
                if (req.query.location) {
                    let checkLocation = await location.find({ location: req.query.location });
                    if (checkLocation) {
                        return res.status(200).send(controller.successFormat({
                            "message": checkLocation
                        }, 'service', 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "message": []
                    }, 'service', 200));
                }
                let check = await location.find({});
                if (check) {
                    return res.status(200).send(controller.successFormat({
                        "message": check
                    }, 'service', 200));
                }
                return res.status(200).send(controller.successFormat({
                    "message": []
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.successFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async updateLocation(req, res) {
            try {
                let data = req.body.data;
                data.updateBy = req.admin_name
                let checkLocation = await location.findOne({ _id: req.params.location._id })
                if (!checkLocation) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Location doesn't exits."
                    }, 'service', 400));
                }
                await location.findOneAndUpdate({ _id: req.params.location._id }, data)
                return res.status(200).send(controller.successFormat({
                    "message": "Location had successfully updated."
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },


    }
}
module.exports = services()