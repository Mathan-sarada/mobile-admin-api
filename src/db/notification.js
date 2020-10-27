const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    message: { type: String, required: true },
    status: { type: Boolean, default: false }

}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});

let notifications = mongoose.model('notification', schema);
notifications.createIndexes();
exports.notifications = notifications
