const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    admin_users: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    super_admin_password: { type: String, required: true }
}, {
    timestamps: { createdAt: '', updatedAt: 'modified_date' }
});

let superAdmin = mongoose.model('super-admin', schema);
superAdmin.createIndexes();
exports.superAdmin = superAdmin
