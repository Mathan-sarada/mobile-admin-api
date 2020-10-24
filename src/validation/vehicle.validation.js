const Joi = require('joi');
class validation {

    async addVehicle(req) {
        let schema = Joi.object().keys({
            vehicle_name: Joi.string().required(),
            vehicle_cc: Joi.string().required(),
            vehicle_model_year:Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

    async updateVehicle(req) {
        let schema = Joi.object().keys({
            vehicle_name: Joi.string(),
            vehicle_cc: Joi.string(),
            vehicle_model_year:Joi.string(),
            status: Joi.bool()
        });

        return schema.validate(req, { abortEarly: false });
    }

}

module.exports = new validation;