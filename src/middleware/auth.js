const controller = require('../core/controller');
const verifyUser = require('../core/apikey')
module.exports = async (req, res, next) => {
    let check = await verifyUser.verifyKeys(req.headers.api, req.headers.secret, req.query.admin_id);
    if (check.status) {
        req.admin_name = check.result
        next();
    } else {
        return res.status(400).json(controller.errorMsgFormat({
            "message": check.err
        }));
    }

}