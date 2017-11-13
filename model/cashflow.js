var mongoose = require('mongoose');

var CashflowSchema = mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    operating: {
        type: Number,
        required: true
    },
    investment: {
        type: Number,
        required: true
    },
    fundrasing: {
        type: Number,
        required: true
    }
});

// var Cashflow = mongoose.model('Cashflow', CashflowSchema);

module.exports = {
    // Cashflow,
    CashflowSchema
};