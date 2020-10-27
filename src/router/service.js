const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const validation = require('../validation/service.validation');
const service = require('../core/service')
const auth = require('../middleware/auth')

router.get('/category',async (req, res) => {
    try {
        await service.getCategory(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }
});


router.get('/', async (req, res) => {
    try {
        await service.getService(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }
});

router.post('/add-category', async (req, res) => {
    try {
        let { error } = await validation.addCategory(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "service", 400));
        }
        service.addCategory(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }

});

router.patch('/edit-category/:category_id', async (req, res) => {
    try {
        let { error } = await validation.updateCategory(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "service", 400));
        }
        service.updateCategory(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }
});

router.post('/add-service', async (req, res) => {
    try {
        service.addService(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }

});

router.patch('/edit-service/:service_id', async (req, res) => {
    try {
        let { error } = await validation.updateService(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "service", 400));
        }
        service.updateService(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }
});

router.post('/location', async (req, res) => {
    try {
        let { error } = await validation.addLocation(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "service", 400));
        }
        service.addLocation(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }

});

router.get('/location', async (req, res) => {
    try {
        await service.getLocation(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }
});
router.patch('/location/:location_id', async (req, res) => {
    try {
        let { error } = await validation.updateLocation(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "service", 400));
        }
        service.updateLocation(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }
});
module.exports = router;