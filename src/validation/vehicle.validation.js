const Joi = require('joi');
class validation {

    async addVehicle(req) {
        let schema = Joi.object().keys({
            vehicle_cc: Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

    async updateVehicle(req) {
        let schema = Joi.object().keys({
            vehicle_cc: Joi.string(),
            status: Joi.bool()
        });

        return schema.validate(req, { abortEarly: false });
    }

}

module.exports = new validation;