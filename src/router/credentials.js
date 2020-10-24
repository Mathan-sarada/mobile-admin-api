const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const validation = require('../validation/credentials.validation');
const credentials = require('../core/credentials')

router.post('/register', async (req, res) => {
    try {
        let { error } = await validation.register(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "register", 400));
        }
        credentials.register(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "register", 500));
    }
});

router.post('/login/:admin_id', async (req, res) => {
    try {
        let { error } = await validation.login(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "register", 400));
        }
        credentials.login(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "register", 500));
    }
});

router.post('/logout/:admin_id', async (req, res) => {
    try {
        
        credentials.logout(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "register", 500));
    }
});
module.exports = router;