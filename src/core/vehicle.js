const controller = require('./controller')
const { vehicles } = require('../db/vehicle');

const vehicle = () => {
    return {
        async addVehicle(req, res) {
            try {
                let data = req.body.data;
                data.createdBy = req.admin_name
                let checkData = await vehicles.findOne({ vehicle_name: data.vehicle_name, vehicle_cc: data.vehicle_cc,vehicle_model_year: data.vehicle_model_year })
                if (checkData) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Vechile name or cc already added"
                    }, 'vehicle', 400));
                }
                await new vehicles(data).save();
                return res.status(200).send(controller.successFormat({
                    "message": "Vehicle have been successfully added"
                }, 'vehicle', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'vehicle', 400));
            }
        },

        async getVehicle(req, res) {
            try {
                if (req.query.vehicle_name) {
                    let checkVehicle = await vehicles.find({ vehicle_name: req.query.vehicle_name, status: true });
                    if (checkVehicle) {
                        return res.status(200).send(controller.successFormat({
                            "messsage": checkVehicle
                        }, 'vehicle', 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "messsage": []
                    }, 'vehicle', 200));    
                }
                let check = await vehicles.find({ status: true });
                if (check) {
                    return res.status(200).send(controller.successFormat({
                        "messsage":check
                    }, 'vehicle', 200));
                }
                return res.status(200).send(controller.successFormat({
                    "messsage": []
                }, 'vehicle', 200));
            }
            catch (err) {
                return res.status(400).send(controller.successFormat({
                    "message": err.message
                }, 'vehicle', 400));
            }
        },

        async updateVehicle(req, res) {
            try {
                let data = req.body.data;
                data.updateBy = req.admin_name
                let checkVehicle = await vehicles.findOne({ _id: req.params.vehicle_id })
                if (!checkVehicle) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "vehicle doesn't exits."
                    }, 'vehicle', 400));
                }
                if (data.vehicle_name && data.vehicle_cc) {
                    let checkVehicle = await vehicles.find({ vehicle_cc: data.vehicle_cc, vehicle_name: data.vehicle_name })
                    if (checkVehicle.length > 0) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "This vehicle name has already on vehicle cc or Is not Active"
                        }, 'vehicle', 400));
                    }
                }
                else if (data.vehicle_name) {
                    let vehicleName = await vehicles.find({ vehicle_cc: checkVehicle.vehicle_cc, vehicle_name: data.vehicle_name })
                    if (vehicleName.length > 0) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "This vehicle name has already on vehicle cc or Is not Active"
                        }, 'vehicle', 400));
                    }
                }
                else {
                    let vehilceCC = await vehicles.find({ vehicle_cc: data.vehicle_cc, vehicle_name: checkVehicle.vehicle_name })
                    if (vehilceCC.length > 0) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "This vehicle name has already on vehicle cc or Is not Active"
                        }, 'vehicle', 400));
                    }
                }
                await vehicles.findOneAndUpdate({ _id: req.params.vehicle_id }, data)
                return res.status(200).send(controller.successFormat({
                    "message": "vehicle had successfully updated."
                }, 'vehicle', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'vehicle', 400));
            }
        },
    }
}
module.exports = vehicle()