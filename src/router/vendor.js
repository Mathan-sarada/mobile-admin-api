const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const validation = require('../validation/vendor.validation');
const vendor = require('../core/vendor')

router.get('/', async (req, res) => {
    try {
        await vendor.getVendor(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "vendor", 500));
    }
});

router.post('/add-vendor', async (req, res) => {
    try {
        let { error } = await validation.addVendor(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "vendor", 400));
        }
        vendor.addVendor(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "vendor", 500));
    }

});

router.patch('/edit-vendor/:vendor_id', async (req, res) => {
    try {
        let { error } = await validation.updateVendor(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "vendor", 400));
        }
        vendor.updateVendor(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "vendor", 500));
    }
});
module.exports = router;