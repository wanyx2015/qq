var cheerio = require('cheerio');
const iconv = require('iconv-lite');
var http = require("http")

var processIncomeStatement = (html) => {
    $ = html;
    console.log();
    console.log("公司利润表");
    $('th').each(function (i, elem) {

        key = $(this).text().trim();
        value = $(this).next().text().trim();

        i + 1 == 1 ? console.log(key, value) : void(0);
        i + 1 == 2 ? console.log(key, value) : void(0);
        i + 1 == 3 ? console.log(key, value) : void(0);
        i + 1 == 4 ? console.log(key, value) : void(0);
        i + 1 == 5 ? console.log(key, value) : void(0);
        i + 1 == 6 ? console.log(key, value) : void(0);
        i + 1 == 7 ? console.log(key, value) : void(0);
        i + 1 == 8 ? console.log(key, value) : void(0);
        i + 1 == 12 ? console.log(key, value) : void(0);
        i + 1 == 13 ? console.log(key, value) : void(0);
        i + 1 == 14 ? console.log(key, value) : void(0);
        i + 1 == 19 ? console.log(key, value) : void(0);
    });
}

var processAssetStatement = (html) => {
    $ = html;
    console.log();
    console.log("资产负债表");
    $('th').each(function (i, elem) {

        key = $(this).text().trim();
        value = $(this).next().text().trim();

        i + 1 == 1 ? console.log(key, value) : void(0);
        i + 1 == 6 ? console.log(key, value) : void(0);
        i + 1 == 21 ? console.log(key, value) : void(0);
        i + 1 == 34 ? console.log(key, value) : void(0);
        i + 1 == 57 ? console.log(key, value) : void(0);
        i + 1 == 66 ? console.log(key, value) : void(0);
    });
}

var processCashFlow = (html) => {
    $ = html;
    console.log();
    console.log("现金流量表");
    $('th').each(function (i, elem) {

        key = $(this).text().trim();
        value = $(this).next().text().trim();

        i + 1 == 1 ? console.log(key, value) : void(0);
        i + 1 == 12 ? console.log(key, value) : void(0);
        i + 1 == 25 ? console.log(key, value) : void(0);
        i + 1 == 35 ? console.log(key, value) : void(0);
    });
}


var getPage = function (url, callback) {
    http.get(url, function (sres) {
        var chunks = [];
        sres.on('data', function (chunk) {
            chunks.push(chunk);
        });
        sres.on('end', function () {
            // 将二进制数据解码成 gb2312 编码数据
            var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
            var $ = cheerio.load(html, {
                decodeEntities: false
            });
            callback($);
        });
    });
}


getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2012', processIncomeStatement);
getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2013', processIncomeStatement);
getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2014', processIncomeStatement);
getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2015', processIncomeStatement);
getPage('http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2016', processIncomeStatement);

getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2012', processAssetStatement);
getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2013', processAssetStatement);
getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2014', processAssetStatement);
getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2015', processAssetStatement);
getPage('http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2016', processAssetStatement);

getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2012', processCashFlow);
getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2013', processCashFlow);
getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2014', processCashFlow);
getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2015', processCashFlow);
getPage('http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2016', processCashFlow);