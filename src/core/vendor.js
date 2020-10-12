const controller = require('./controller')
const { vendor } = require('../db/vendor');

const vendors = () => {
    return {
        async addVendor(req, res) {
            try {
                let data = req.body.data;
                //data.createdBy = req.admin_name
                let checkData = await vendor.find({
                    $or: [{
                        email: data.email
                    }, {
                        mobile: data.mobile
                    }]
                })
                if (checkData.length > 0) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Email or mobile already added"
                    }, 'vendor', 400));
                }
                await new vendor(data).save();
                return res.status(200).send(controller.successFormat({
                    "message:": "Vendor have been successfully added"
                }, 'vendor', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'vendor', 400));
            }
        },

        async getVendor(req, res) {
            try {
                if (req.query.email) {
                    let checkEmail = await vendor.findOne({ email: req.query.email.toLowerCase()});
                    if (checkEmail) {
                        return res.status(200).send(controller.errorMsgFormat({
                            "data:": [checkEmail]
                        }, 'vendor', 200));
                    }
                    return res.status(200).send(controller.errorMsgFormat({
                        "data:": []
                    }, 'vendor', 200));
                }
                let checkEmail = await vendor.find({});
                if (checkEmail) {
                    return res.status(200).send(controller.errorMsgFormat({
                        "data:": checkEmail
                    }, 'vendor', 200));
                }
                return res.status(200).send(controller.errorMsgFormat({
                    "data:": []
                }, 'vendor', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'vendor', 400));
            }
        },

        async updateVendor(req, res) {
            try {
                let data = req.body.data;
                //data.updateBy = req.admin_name
                let checkVendor = await vendor.findOne({ _id: req.params.vendor_id })
                if (!checkVendor) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Vendor doesn't exits."
                    }, 'vendor', 400));
                }
                let checkData = await vendor.find({
                    $or: [{
                        email: data.email
                    }, {
                        mobile: data.mobile
                    }]
                })
                if (checkData.length > 0) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Email or mobile already added."
                    }, 'vendor', 400));
                }
               
                await vendor.findOneAndUpdate({ _id: req.params.vendor_id }, data)
                return res.status(200).send(controller.successFormat({
                    "message:": "Vendor had successfully updated."
                }, 'vendor', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": err.message
                }, 'vendor', 400));
            }
        },
    }
}
module.exports = vendors()