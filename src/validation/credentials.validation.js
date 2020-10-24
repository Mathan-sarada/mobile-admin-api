const Joi = require('joi');
class validation {

    async register(req) {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            role: Joi.string().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.any().valid(Joi.ref('password')).required().error(errors => {
                errors.forEach(err => {
                    switch (err.code) {
                        case "any.only":
                            err.message = 'The password you entered do not match.';
                            break;
                    }
                })
                return errors
            }),
            super_admin_password: Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

    async login(req) {
        let schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

}

module.exports = new validation;