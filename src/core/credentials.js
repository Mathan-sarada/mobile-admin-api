const { credential } = require('../db/credentials');
const { superAdmin } = require('../db/superAdmin');
const helpers = require('../helpers/helper.functions');
const controller = require('../core/controller')
const generateKey = require('../core/apikey')
const bcrypt = require('bcryptjs')
const credentials = () => {
    return {
        async register(req, res) {
            try {
                let data = req.body.data;
                let checkEmail = await credential.findOne({ email: data.email });
                if (checkEmail) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Email already register"
                    }, 'credentials', 400));
                }
                let checkPassword = await superAdmin.findOne({ password: data.super_admin_password })
                if (!checkPassword) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Super Admin password doesn't exits"
                    }, 'credentials', 400));
                }
                let salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                let inc = await superAdmin.findOneAndUpdate({ role: "super-admin", password: data.super_admin_password }, {
                    $inc: {
                        admin_users: 1
                    }
                });
                let payload = {
                    admin_id: inc.admin_users,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    password: data.password,
                    super_admin_password: data.super_admin_password
                }
                await new credential(payload).save()
                return res.status(200).send(controller.successFormat({
                    "message": "Register have been successfully added"
                }, 'credentials', 200));
            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'credentials', 400));
            }
        },
        async login(req, res) {
            try {
                let data = req.body.data;
                let check = await credential.findOne({ admin_id: req.params.admin_id });
                if (!check) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Admin id doesn't exits"
                    }, 'credentials', 400));
                }
                if (check.email != data.email) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Email id  doesn't match this admin id"
                    }, 'credentials', 400));
                }
                //data.password = await helpers.decrypt(data.password, res);
                let passwordCompare = bcrypt.compareSync(data.password, check.password);
                if (passwordCompare == false) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Password didn't match"
                    }, 'credentials', 400));
                }
                let payload = {
                    admin_id: check.admin_id,
                    email: check.email
                }
                let creatApiKey = await generateKey.createApikey(payload);
                if (creatApiKey.status) {
                    return res.status(200).send(controller.errorMsgFormat({
                        "message": "Login Sucessfully",
                        "adminKey": check.admin_id,
                        "apiKey": creatApiKey.result.apiKey,
                        "secretKey": creatApiKey.result.secretKey
                    }, 'credentials', 200));
                }

                return res.status(400).send(controller.errorMsgFormat({
                    "message": creatApiKey.error
                }, 'credentials', 400));
            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'credentials', 400));
            }
        },
        async logout(req, res) {
            try {
                let check = await credential.findOne({ admin_id: req.params.admin_id });
                if (!check) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Admin id doesn't exits"
                    }, 'credentials', 400));
                }
                await credential.findOneAndUpdate({ admin_id: req.params.admin_id }, { api_key: null, secert_key: null })
                return res.status(200).send(controller.errorMsgFormat({
                    "message": "Logout Sucessfully"
                }, 'credentials', 200));

            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'credentials', 400));
            }
        },

    }
}
module.exports = credentials()