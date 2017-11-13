const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require("http")
var Company = require('../model/company').Company;
var mongoose = require('mongoose');

var processIncomeStatement = (html) => {
    $ = html;
    console.log();
    console.log("公司利润表");
    company = getCompanyName(html);
    console.log(company.name, company.symbol);
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
    company = getCompanyName(html);
    console.log(company.name, company.symbol);
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

    data = getCompanyName(html);
    console.log(data.name, data.symbol);


    var company = new Company({
        name: data.name,
        symbol: data.symbol
    });

    var promise = company.save();

    promise.then((doc) => {
        console.log("save", doc);
    }, (err) => {
        console.log("ERROR on save()", err);
    });

    // Company.find({}, function (err, data) {
    //     if (err) {
    //         return console.log(err);
    //     };
    //     console.log("find() callback", data);
    // })

    Company.find({
        name: data.name
    }).then((doc) => {
        console.log("find() promise", doc);
    })

    $('th').each(function (i, elem) {

        key = $(this).text().trim();
        value = $(this).next().text().trim();

        i + 1 == 1 ? console.log(key, value) : void(0);
        i + 1 == 12 ? console.log(key, value) : void(0);
        i + 1 == 25 ? console.log(key, value) : void(0);
        i + 1 == 35 ? console.log(key, value) : void(0);
    });
}

var getCompanyName = (html) => {
    $ = html;
    str = $('span[class = "fc4 fs14 fntTahoma"]').text();
    name = str.split(" ")[0];
    symbol = str.split(" ")[1];
    return ({
        name,
        symbol
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


module.exports = {
    getPage,
    getCompanyName,
    processAssetStatement,
    processIncomeStatement,
    processCashFlow
}