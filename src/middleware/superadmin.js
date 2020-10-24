const Controlletr = require('../core/controller');
const controller = new Controlletr;
const verifyUser = require('../core/apikey');
module.exports = async (req, res, next) => {
    let checkSuperadmin = await verifyUser.superadminPasswordCheck(req, res);
    if (checkSuperadmin.status) {
        next();
    } else {
        return res.status(400).json(controller.errorMsgFormat({
            "message": checkSuperadmin.err
        }));
    }
}