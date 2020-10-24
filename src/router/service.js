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
        let { error } = await validation.addService(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "service", 400));
        }
        service.addService(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "service", 500));
    }

});

router.patch('/edit-service/:description_id', async (req, res) => {
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
module.exports = router;