var mongoose = require('mongoose');
// const CashFlow = require('./cashflow').Cashflow;
const CashflowSchema = require('./cashflow').CashflowSchema;

var CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        unique: true        
    },
    symbol: {
        type: String,
        required: true,
        minLength: 1,
        unique: true        
    },

    cashflow: [CashflowSchema],

    updatedAt: {
        type: Number,
        default: null
    },
    // _creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // }
});

var Company = mongoose.model('Company', CompanySchema);
// var CashFlow = {
//     year: String,
//     operating: Number,
//     investment: Number,
//     fundrasing: Number,
// }

// var CashFlow = {
//     year: {
//         type: String,
//         required: true
//     },
//     operating: {
//         type: Number,
//         required: true
//     },
//     investment: {
//         type: Number,
//         required: true
//     },
//     fundrasing: {
//         type: Number,
//         required: true
//     }
// }

module.exports = {
    Company
};