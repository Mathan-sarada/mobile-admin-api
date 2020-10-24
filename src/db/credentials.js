const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    admin_id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    super_admin_password: { type: String, required: true },
    api_key: { type: String },
    secert_key: { type: String },
    create_date:{type: Date}
});

let credential = mongoose.model('credentials', schema);
credential.createIndexes();
exports.credential = credential
