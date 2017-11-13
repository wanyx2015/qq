var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var CashflowSchema = mongoose.Schema({
    year: {
        type: String,
        required: true,
        // unique: true        
    },
    operating: {
        type: mongoose.Schema.Types.Double,
        required: true,
        default: 0
    },
    investment: {
        // type: Number,
        type: mongoose.Schema.Types.Double,
        required: true
    },
    fundrasing: {
        // type: Number,
        type: mongoose.Schema.Types.Double,
        required: true
    }
});

// var Cashflow = mongoose.model('Cashflow', CashflowSchema);

module.exports = {
    // Cashflow,
    CashflowSchema
};