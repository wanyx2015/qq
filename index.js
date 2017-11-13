const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require("http")
var Company = require('./model/company').Company;
var mongoose = require('mongoose');
var page = require('./utils/page');

// this statement avoid warning: DeprecationWarning: Mongoose: mpromise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/StockApp', {
    useMongoClient: true
});

var symbols = ['600410', '000977', '002520', '300216', '002410', '600478', '000895', '002271', '002081', '603000', '002367']
symbols = ['600410', '000977', '002520', '300216', '002410', '600478', '000895', '002271', '002081', '603000', '002367']
symbols = ['600410', '000977'];
symbols = ['002410'];

var years = [2016, 2015, 2014, 2013, 2012, 2011, 2010];
years = [2016, 2015, 2014, 2013, 2012, 2011, 2010]
// years = [2016, 2015, 2014, 2013]
// years = [2016, 2015]
//years = [2016]

var jobList = [];
var job;

//    PREPARING THE JOB LIST
for (i in symbols) {
    for (j in years) {
        if (symbols[i].length > 0) {
            jobList.push({
                symbol: symbols[i].trim(),
                year: years[j]
            })
        }
    }
}

console.log("Num of symbols: " + symbols.length);
console.log("Num of jobs: " + jobList.length);
console.log(jobList);

function processSymbols() {
    job = jobList.shift();
    var symbol = job.symbol;
    var year = job.year;

    var url_balance = `http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=${job.symbol}&type=${job.year}`;
    var url_income = `http://stock.finance.qq.com/corp1/inst.php?zqdm=${job.symbol}&type=${job.year}`;
    var url_cashflow = `http://stock.finance.qq.com/corp1/cfst.php?zqdm=${job.symbol}&type=${job.year}`;


    console.log(url_balance);
    console.log(url_income);
    console.log(url_cashflow);

    page.processIncomeStatement(url_income);
    page.processAssetStatement(url_balance);
    page.processCashFlow(url_cashflow);
    
    if (jobList.length > 0) {
        setTimeout(processSymbols, 3000);
    }
}

processSymbols();


// let counter = 0;

// function foo() {
//     console.log(`foo ${counter}`);
//     counter++;
//     if (counter < 3) {
//         setTimeout(foo, 1000);
//     }
// }
// foo();