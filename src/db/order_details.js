const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'users', index: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicle', index: true },
    services: [{ type: String, required: true }],
    description:[[{ type: String, required: true }]],
    price:[{ type: Number, required: true }],
    tax:[{ type: Number, required: true }],
    location: { type: String, required: true },
    mobile_number: { type: String, required: true },
    vehicle_no: { type: String, required: true },
    vehicle_owner_name: { type: String, required: true },
    address: { type: String, required: true },
    is_check:{type:Boolean,default:false},
    isVerified: { type: Boolean, default: false },
    vendor_email:{ type: String, required: true }

}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});

let orderDetails = mongoose.model('order-details', schema);
orderDetails.createIndexes();
exports.orderDetails = orderDetails
