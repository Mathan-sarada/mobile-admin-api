const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const validation = require('../validation/details.validation');
const product = require('../core/product')

router.post('/add-product', async (req, res) => {
    try {
        let { error } = await validation.productValidation(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "product-details", 400));
        }
        product.addProduct(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "product-details", 500));
    }
});

module.exports = router;