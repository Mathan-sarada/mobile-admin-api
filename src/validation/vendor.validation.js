const Joi = require('joi');
class validation {

    async addVendor(req) {
        let schema = Joi.object().keys({
            vendor_name: Joi.string().required(),
            email:Joi.string().required(),
            mobile :Joi.string().required().min(10).max(10),
            location:Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

    async updateVendor(req) {
        let schema = Joi.object().keys({
            vendor_name: Joi.string(),
            email:Joi.string(),
            mobile :Joi.string().min(10).max(10),
            location:Joi.string()
        });

        return schema.validate(req, { abortEarly: false });
    }
   

}

module.exports = new validation;