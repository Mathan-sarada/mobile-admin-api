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
    service_name: { type: String, required: true, lowercase: true },
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});
let service = mongoose.model('services', serviceSchema);
service.createIndexes();

let descriptionSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category', index: true },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'services', index: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicles', index: true },
    description: { type: String, required: true, lowercase: true },
    price: { type: Number, required: true },
    tax: { type: Number, required: true },
    createdBy: { type: String },
    updateBy: { type: String }
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});
let description = mongoose.model('service-description', descriptionSchema);
description.createIndexes();




exports.category = category;
exports.service = service;
exports.description = description;

