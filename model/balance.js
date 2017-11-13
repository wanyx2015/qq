var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var BalanceSchema = mongoose.Schema({
    year: {
        type: String,
        required: true,
        // unique: true        
    },
    ar: {
        type: mongoose.Schema.Types.Double,
        required: true,
        default: 0
    },
    fixedasset: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    totalasset: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    totalliability: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    totalownerequity: {
        type: mongoose.Schema.Types.Double,
        required: true
    }
});

module.exports = {
    BalanceSchema
};