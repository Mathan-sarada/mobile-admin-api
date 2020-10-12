const controller = () => {
    return {
        errorMsgFormat(error, type = 'service', code = 400) {
            return Object.assign({
                "code": code,
                "errors": true,
                "data": {
                    error
                }
            });
        },

        errorFormat(error) {
            let errors = {};
            if (error.details) {
                error.details.forEach((detail) => {
                    errors[detail.path] = detail.message;

                });
            } else {
                errors = error;
            }
            return this.errorMsgFormat({ message: errors }, 'service', 400);
        },

        successFormat(res, id = null, type = 'service', code = 200) {
            return Object.assign({
                "code": code,
                "errors": false,
                "data": {
                     res
                }
            });
        }
    }
};

module.exports = controller()