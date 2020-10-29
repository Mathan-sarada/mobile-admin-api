const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    orderDetails: { type: mongoose.Schema.Types.Mixed },
    isVerified:{type:Boolean,required:true},
    vendor_email:{type:String,required:true},
    status:{type:String,default:"Unpaid"}

}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});

let orderDetails = mongoose.model('order-details', schema);
orderDetails.createIndexes();
exports.orderDetails = orderDetails
