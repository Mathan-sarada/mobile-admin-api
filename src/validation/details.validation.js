const Joi = require('joi');
class validation {

    async productValidation(req) {
        let schema = Joi.object().keys({
            vehicle_name: Joi.string().required(),
            vehicle_cc:Joi.string().required(),
            service_name :Joi.string().required(),
        });

        return schema.validate(req, { abortEarly: false });
    }

    async orderDetails(req) {
        let schema = Joi.object().keys({
            location: Joi.string(),
            mobile_number: Joi.string()
        });

        return schema.validate(req, { abortEarly: false });
    }
    async vendorMessage(req) {
        let schema = Joi.object().keys({
            mobile_number: Joi.string().required().min(10).max(10)
        });

        return schema.validate(req, { abortEarly: false });
    }

}

module.exports = new validation;