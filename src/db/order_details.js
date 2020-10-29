const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    orderDetails: { type: mongoose.Schema.Types.Mixed },
    isVerified: { type: Boolean },
    vendor_email: { type: String },
    status: { type: String }

}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});

let orderDetails = mongoose.model('order-details', schema);
orderDetails.createIndexes();
exports.orderDetails = orderDetails
