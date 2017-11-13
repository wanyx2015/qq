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


// getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2012', processIncomeStatement);
// getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2013', processIncomeStatement);
// getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2014', processIncomeStatement);
// getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2015', processIncomeStatement);
// getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2016', processIncomeStatement);

// getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2012', processAssetStatement);
// getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2013', processAssetStatement);
// getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2014', processAssetStatement);
// getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2015', processAssetStatement);
// getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2016', processAssetStatement);

// getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2012', processCashFlow);
// getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2013', processCashFlow);
// getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2014', processCashFlow);
// getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2015', processCashFlow);
page.getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2016', page.processCashFlow);
page.getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=600010&type=2016', page.processCashFlow);

// getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2016', getCompanyName);