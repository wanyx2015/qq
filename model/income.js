var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var IncomeSchema = mongoose.Schema({
    year: {
        type: String,
        required: true,
        // unique: true        
    },
    totaloperatingincome: {
        type: mongoose.Schema.Types.Double,
        required: true,
        default: 0
    },
    totaloperatingcost: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    salestaxes: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    salesexpenses: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    gaexpenses: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    financialexpenses: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    assetdevaluation: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    operatingprofit: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    nonoperatingincome: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    operatingexpenses: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    netincome: {
        type: mongoose.Schema.Types.Double,
        required: true
    }
});

module.exports = {
    IncomeSchema
};