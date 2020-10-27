const express = require('express');
const router = express.Router();
const notification = require('../core/notifcation')


router.get('/', async (req, res) => {
    try {
        notification.getMessage(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "register", 500));
    }
});

router.patch('/:messageId', async (req, res) => {
    try {
        notification.updateMessage(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "register", 500));
    }
});

module.exports = router;