const controller = require('./controller')
const { notifications } = require('../db/notification')

const notification = () => {
    return {
        async getMessage(req, res) {
            try {
                let getMessage = await notifications.find({ status: false })
                if (getMessage.length > 0) {
                    return res.status(200).send(controller.successFormat({
                        "message": getMessage
                    }, 'service', 200));
                }
                return res.status(200).send(controller.successFormat({
                    "message": []
                }, 'service', 200));
            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'credentials', 400));
            }
        },

        async updateMessage(req, res) {
            try {
                let getMessage = await notifications.findOne({ _id: req.params.messageId, status: false })
                if (!getMessage) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Message id doesn't exits"
                    }, 'credentials', 400));
                }
                getMessage.status = true;
                getMessage.save()
                return res.status(200).send(controller.successFormat({
                    "message": "Message had been successfully updated."
                }, 'service', 200));
            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'credentials', 400));
            }
        }
    }
}

module.exports = notification()