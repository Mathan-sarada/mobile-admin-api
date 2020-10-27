const express = require('express');
const router = express.Router();
const vendor = require('./vendor')
const vehicle = require('./vehicle')
const service = require('./service')
const orderDetails = require('./orderDetails')
const credentials = require('./credentials')
const notification = require('./notification')


router.use(express.static('dist'));
router.use('/vendor/', vendor);
router.use('/vehicle/', vehicle);
router.use('/service', service)
router.use('/order-details', orderDetails)
router.use('/user',credentials)
router.use('/notification',notification)



module.exports = router;