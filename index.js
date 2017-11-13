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



// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2013');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2014');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2015');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2016');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=600010&type=2016');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=600030&type=2016');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=600030&type=2015');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=600031&type=2015');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=600032&type=2015');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=600033&type=2015');
page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2015');
// page.processCashFlow('http://stock.finance.qq.com/corp1/cfst.php?zqdm=600035&type=2015');

// page.processAssetStatement('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2012');
// page.processAssetStatement('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2013');
// page.processAssetStatement('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2014');
// page.processAssetStatement('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2015');
page.processAssetStatement('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2016');

page.processIncomeStatement('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2014');