const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    location: { type: String, required: true },
    mobile_number: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    vendor_email:{ type: String, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product-details', index: true },
    createdBy: { type: String },
    updateBy: { type: String },
}, {
    timestamps: { createdAt: '', updatedAt: 'modified_date' }
});

let orderDetails = mongoose.model('order-details', schema);
orderDetails.createIndexes();
exports.orderDetails = orderDetails
