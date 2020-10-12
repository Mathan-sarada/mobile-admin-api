const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    vendor_name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    location: { type: String, required: true },
    mobile: { type: String, required: true },
    status: { type: Boolean, default: true },
    createdBy: { type: String },
    updateBy: { type: String }
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});
let vendor = mongoose.model('vendor', schema);
vendor.createIndexes();
exports.vendor = vendor;