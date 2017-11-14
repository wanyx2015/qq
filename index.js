const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require("http")
var Company = require('./model/company').Company;
var mongoose = require('mongoose');
var page = require('./utils/page');

const fs = require("fs");

// this statement avoid warning: DeprecationWarning: Mongoose: mpromise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/StockApp', {
    useMongoClient: true
});

var symbols = ['600410', '000977', '002520', '300216', '002410', '600478', '000895', '002271', '002081', '603000', '002367']
symbols = ['600410', '000977', '002520', '300216', '002410', '600478', '000895', '002271', '002081', '603000', '002367']
// symbols = ['600410', '000977'];
// symbols = ['002410'];

var years = [2016, 2015, 2014, 2013, 2012, 2011, 2010];
years = [2016, 2015, 2014, 2013, 2012, 2011, 2010]
// years = [2016, 2015, 2014, 2013]
// years = [2016, 2015]
//years = [2016]

var jobList = [];
var job;

// PREPARING THE JOB LIST
fs.readFile('./all_symbols_qq.txt', function (err, data) {
    console.log("Reading file...");
    if (err) throw err;

    symbols = data.toString().split('\n');

    // symbols = ['601988'];
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
        console.log();
        job = jobList.shift();
        var symbol = job.symbol;
        var year = job.year;

        var url_balance = `http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=${job.symbol}&type=${job.year}`;
        var url_income = `http://stock.finance.qq.com/corp1/inst.php?zqdm=${job.symbol}&type=${job.year}`;
        var url_cashflow = `http://stock.finance.qq.com/corp1/cfst.php?zqdm=${job.symbol}&type=${job.year}`;

        Company.findOne({
            symbol: job.symbol
        }).then((doc) => {
            if (doc) {
                console.log(`${job.symbol} ${doc.name} exists, checking ${job.year} data......`);
                
                // check whether symbol year data exist
                var balanceYear = doc.balance.filter((item) => {
                    return item.year.indexOf(job.year) != -1;
                })
                // exist, skip
                if (balanceYear.length > 0) {
                    console.log(`${job.symbol} ${doc.name} exists, checking ${job.year} data done......exists...`);
                    if (jobList.length > 0) {
                        setTimeout(processSymbols, 1000);
                        console.log("Job remaining:", jobList.length)
                    }
                    return;
                }

                console.log(`${job.symbol} ${doc.name} exists, checking ${job.year} data done......not exists...`);
                
                console.log(url_balance);
                console.log(url_income);
                console.log(url_cashflow);
    
                page.processIncomeStatement(url_income);
                page.processAssetStatement(url_balance);
                page.processCashFlow(url_cashflow);
    
                if (jobList.length > 0) {
                    setTimeout(processSymbols, 20000);
                    console.log("Job remaining:", jobList.length)
                }

                return;
                
            }

            console.log(`${job.symbol} not exists...`);
            
            console.log(url_balance);
            console.log(url_income);
            console.log(url_cashflow);

            page.processIncomeStatement(url_income);
            page.processAssetStatement(url_balance);
            page.processCashFlow(url_cashflow);

            if (jobList.length > 0) {
                setTimeout(processSymbols, 20000);
                console.log("Job remaining:", jobList.length)
            }

        }, (err) => {
            console.log("ERROR when checking ${job.symbol} ${job.year}", err);
            if (jobList.length > 0) {
                setTimeout(processSymbols, 20000);
                console.log("Job remaining:", jobList.length)
            }
        })


    }

    processSymbols();

});


// let counter = 0;

// function foo() {
//     console.log(`foo ${counter}`);
//     counter++;
//     if (counter < 3) {
//         setTimeout(foo, 1000);
//     }
// }
// foo();

// var options = {
//     host: '127.0.0.1',
//     port: '3000',
//     path: '/header',
//     "Connection": "keep-alive",
//     "Cache-Control": "max-age=0",
//     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36",
//     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
//     "Accept-Encoding": "gzip, deflate, br",
//     "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
// };


// {
//     host: "localhost",
//     port: '3000',
//     "Connection": "keep-alive",
//     "Cache-Control": "max-age=0",
//     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36",
//     "Upgrade-Insecure-Requests": "1",
//     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
//     "Accept-Encoding": "gzip, deflate, br",
//     "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
//     "Cookie": "_ga=GA1.1.160019907.1501408638",
//     "If-None-Match": "W/\"215-iLr6oVkVqZ38JdfjNS0/3CzeqMk\""
// }
// http.get(options, function (res) {
//     console.log("Got response: " + res.statusCode);
//     console.log(res.headers);
// }).on('error', function (e) {
//     console.log("Got error: " + e.message);
// });