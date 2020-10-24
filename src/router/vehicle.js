const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const validation = require('../validation/vehicle.validation');
const vehicle = require('../core/vehicle')

router.get('/', async (req, res) => {
    try {
        await vehicle.getVehicle(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "vehicle", 500));
    }
});

router.post('/add-vehicle', async (req, res) => {
    try {
        let { error } = await validation.addVehicle(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "vehicle", 400));
        }
        vehicle.addVehicle(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "vehicle", 500));
    }

});

router.patch('/edit-vehicle/:vehicle_id', async (req, res) => {
    try {
        let { error } = await validation.updateVehicle(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "vehicle", 400));
        }
        vehicle.updateVehicle(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "vehicle", 500));
    }
});
module.exports = router;