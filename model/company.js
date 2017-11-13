var mongoose = require('mongoose');
// const CashFlow = require('./cashflow').Cashflow;
const CashflowSchema = require('./cashflow').CashflowSchema;
const BalanceSchema = require('./balance').BalanceSchema;
const IncomeSchema = require('./income').IncomeSchema;

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

    balance: [BalanceSchema],

    cashflow: [CashflowSchema],

    income: [IncomeSchema],

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

module.exports = {
    Company
};