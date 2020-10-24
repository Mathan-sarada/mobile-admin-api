const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    vehicle_name: { type: String, required: true, lowercase: true },
    vehicle_model_year:{ type: String, required: true },
    vehicle_cc: { type: String, required: true, lowercase: true },
    status: { type: Boolean, default: true },
    createdBy: { type: String },
    updateBy: { type: String }
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});
let vehicles = mongoose.model('vehicles', schema);
vehicles.createIndexes();

exports.vehicles = vehicles;
