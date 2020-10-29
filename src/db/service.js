const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    category_name: { type: String, required: true, lowercase: true },
    status: { type: Boolean, default: true }
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});
let category = mongoose.model('category', schema);
category.createIndexes();


let serviceSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category', index: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicles', index: true },
    service_name: { type: String, required: true, lowercase: true },
    description: { type: String, required: true, lowercase: true },
    price: { type: Number, required: true },
    service_type: { type: String, required: true },
    status: { type: Boolean, default: true }
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});
let service = mongoose.model('services', serviceSchema);
service.createIndexes();

let locationSchema = new mongoose.Schema({
    location: { type: String },
    status: { type: Boolean }

}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});
let location = mongoose.model('serivce-location', locationSchema);
location.createIndexes();





exports.category = category;
exports.service = service;
exports.location = location;

