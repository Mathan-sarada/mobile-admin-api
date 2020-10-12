const mongoose = require('mongoose');
let schema = new mongoose.Schema({
    total_amount: { type: Number, required: true },
    total_tax: { type: Number, required: true },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'services', index: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicles', index: true }
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});

let productDetails = mongoose.model('product-details', schema);
productDetails.createIndexes();
exports.productDetails = productDetails
