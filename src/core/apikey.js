const moment = require('moment');
const _ = require('lodash');
const crypto = require('crypto');
const helpers = require('../helpers/helper.functions');
const config = require('config');
const { credential } = require('../db/credentials');
class apikey {

    async createApikey(payload) {
        try {
            let data = payload;
            let date = new Date();
            let timestamp = date.valueOf();
            if ((data.admin_id != null && data.admin_id != undefined)) {
                let key = crypto.createHash('sha256').update(
                    `${data.admin_id},${Math.floor(Math.random() * (100000 - 50000) + 50000)}`
                ).digest('hex');
                let secret = helpers.encrypt(JSON.stringify({
                    id: `${Math.floor(Math.random() * (99999 - 9999) + 9999)},${data.admin_id}`
                }), `${config.get('encryption.key')},${timestamp}`);
                let encryptKey = helpers.encrypt(JSON.stringify(
                    key
                ), `${config.get('encryption.encryptKey')},${timestamp}`);

                let secretKey = helpers.encrypt(JSON.stringify(
                    secret
                ), `${config.get('encryption.key')},${timestamp}`);

                let check = await credential.findOne({ admin_id: data.admin_id });
                if (check) {
                    let credentials = Object.assign({
                        api_key: encryptKey,
                        secert_key: secretKey,
                        create_date:date
                    });
                    await credential.findOneAndUpdate({ email: data.email }, credentials)
                }
                else {
                    return { status: false, error: "Already create api and secret key" }
                }
                return {
                    status: true, result: {
                        "apiKey": key,
                        "secretKey": secret
                    }
                }
            }
            return { status: false, error: "Invalid Request" }
        } catch (error) {
            return { status: false, error: error.message }
        }
    }

    async verifyKeys(apiKey, secretKey, admin_id) {
        let check = await credential.findOne({ admin_id: admin_id });
        if (check) {
            let date = check.create_date;
            let timestamp = date.valueOf();
            let decryptApiKey = JSON.parse(helpers.decrypt(check.api_key, `${config.get('encryption.encryptKey')},${timestamp}`));
            let decryptSecretKey = JSON.parse(helpers.decrypt(check.secert_key, `${config.get('encryption.key')},${timestamp}`))
            if (decryptApiKey == apiKey) {
                if (decryptSecretKey == secretKey) {
                    let newDecryptSecretKey = JSON.parse(helpers.decrypt(secretKey, `${config.get('encryption.key')},${timestamp}`));
                    let id = newDecryptSecretKey.id.split(',');
                    if (Number(id[1]) == admin_id) {
                        return { status: true, result: id[2] }
                    }
                    else {
                        return { status: false, err: "Invalid User" };
                    }
                }
                return { status: false, err: "Secret key didn't match" };
            }
            return { status: false, err: "Api key didn't match" };
        }
        return { status: false, err: "Invalid User" };
    }

    async superadminPasswordCheck(req, res) {
        try {
            if (req.query.role != 'super-admin' || _.isEmpty(req.headers.superadmin)) {
                return { status: false, err: 'Only Super-admin can access this endpoint.' }
            }
            let user = await credentials.findOne({ admin_id: req.query.admin_id });
            if (user) {
                let decryptPassword = await helpers.decrypt(user.superadmin_password, config.get('encryption.superadmin_key'));
                if (decryptPassword === req.headers.superadmin) {
                    return { status: true }
                }
                return { status: false, err: 'Super-admin password was wrong.' }
            }
            return { status: false, err: 'User not found.' }
        } catch (error) {
            return { status: false, err: error.message };
        }
    }
}
module.exports = new apikey;