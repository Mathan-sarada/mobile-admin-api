const crypto = require('crypto');
require('dotenv').config();
const buttervalue = Buffer.from("uyewdbnyjsyedord");
const iv = Buffer.from(process.env.KEY);
const controller = require('../core/controller');

class Helpers  {

    encrypt(data) {
        let hash = crypto.createHash('sha256').update(process.env.KEY).digest('base64').substr(0, 32);
        let cipher = crypto.createCipheriv('aes-256-ctr', hash, iv)
        let secret = cipher.update(data, 'utf8', 'hex')
        secret += cipher.final('hex');
        return secret;

    }
    decrypt(data, res) {
        try {
            let hash = crypto.createHash('sha256').update(process.env.KEY).digest('base64').substr(0, 32);
            let cipher = crypto.createDecipheriv('aes-256-ctr', hash, iv)
            let secret = cipher.update(data, 'hex', 'utf8')
            secret += cipher.final('utf8');
            return secret;
        }
        catch (err) {
            return res.send(controller.errorMsgFormat({ "message":"Your request was not encrypted." })).status(400);
        }

    }
   
}

module.exports = new Helpers();
