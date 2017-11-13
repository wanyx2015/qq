const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require("http")
var Company = require('../model/company').Company;
var mongoose = require('mongoose');

var processIncomeStatement = (url) => {

    getPage(url, (html) => {

        $ = html;
        console.log();
        console.log("公司利润表");
        company = getCompanyName(html);
        console.log(company.name, company.symbol);
        $('th').each(function (i, elem) {

            key = $(this).text().trim();
            value = $(this).next().text().trim();

            i + 1 == 1 ? console.log(key, value) : void(0); // Year
            i + 1 == 2 ? console.log(key, value) : void(0); // Total operating income
            i + 1 == 3 ? console.log(key, value) : void(0); // Total operating cost
            i + 1 == 4 ? console.log(key, value) : void(0); // Sales taxes and surcharges
            i + 1 == 5 ? console.log(key, value) : void(0); // Sales expenses
            i + 1 == 6 ? console.log(key, value) : void(0); // GA expenses
            i + 1 == 7 ? console.log(key, value) : void(0); // Financial expenses
            i + 1 == 8 ? console.log(key, value) : void(0); // Impairment losses            
            i + 1 == 12 ? console.log(key, value) : void(0); // Operating profit
            i + 1 == 13 ? console.log(key, value) : void(0); // Non-operating income
            i + 1 == 14 ? console.log(key, value) : void(0); // Operating expenses
            i + 1 == 19 ? console.log(key, value) : void(0); // Net Income Attributable to Shareholders
        });
    });
}

var processAssetStatement = (url) => {

    getPage(url, (html) => {

        $ = html;
        console.log();
        console.log("资产负债表");
        data = getCompanyName(html);
        console.log(data.name, data.symbol);

        var company = new Company({
            name: data.name,
            symbol: data.symbol,
            balance: []
        });

        var bl = {};

        $('th').each(function (i, elem) {

            key = $(this).text().trim();
            value = $(this).next().text().trim();

            value = value.replace("万元", "");
            // year
            if (i + 1 == 1) {
                bl.year = value;
            }
            // account receivable
            if (i + 1 == 6) {
                bl.ar = value;
            }
            // fixed asset
            if (i + 1 == 21) {
                bl.fixedasset = value;
            }
            // total asset
            if (i + 1 == 34) {
                bl.totalasset = value;
            }
            // total liability
            if (i + 1 == 57) {
                bl.totalliability = value;
            }
            // shareholder value
            if (i + 1 == 66) {
                bl.totalownerequity = value;
            }

            i + 1 == 1 ? console.log(key, value) : void(0); // year
            i + 1 == 6 ? console.log(key, value) : void(0); // account receivable
            i + 1 == 21 ? console.log(key, value) : void(0); // fixed asset
            i + 1 == 34 ? console.log(key, value) : void(0); // total asset
            i + 1 == 57 ? console.log(key, value) : void(0); // total liability
            i + 1 == 66 ? console.log(key, value) : void(0); // shareholder value
        });

        company.balance.push(bl);
        var promise = company.save();

        promise.then((doc) => {
            console.log("saved doc", doc);
        }, (err) => {
            if (err.code != 11000) {
                console.log("ERROR on save()", err);
                return;
            }

            // duplicate key error
            // company already existed, insert cashflow into it
            //  if (err.code === 11000) {
            console.log("");
            console.log(company.name, "already existed, insert balance into it");
            console.log(company.name, "going to check:", company.balance[0].year);

            // find existing company in db
            Company.findOne({
                name: company.name
            }).then((doc) => {
                // check whether the year is already inserted
                filtered = doc.balance.filter((item) => {
                    return item.year === company.balance[0].year;
                })

                if (filtered && filtered.length > 0) {
                    console.log(`${doc.name} Cashflow in ${company.balance[0].year} already exist.`)
                    return;
                }

                doc.balance.push(bl);
                doc.save().then((doc) => {
                    console.log("after push", doc);
                }, (err) => {
                    console.log(err);
                })
            }); // end of inserting 
        }); // end of saving document
    });
}

var processCashFlow = (url) => {

    getPage(url, (html) => {
        $ = html;
        console.log();
        console.log("现金流量表");

        data = getCompanyName(html);
        console.log(data.name, data.symbol);

        var company = new Company({
            name: data.name,
            symbol: data.symbol,
            cashflow: []
        });

        var cf = {};
        $('th').each(function (i, elem) {

            key = $(this).text().trim();
            value = $(this).next().text().trim();
            value = value.replace("万元", "");

            if (i + 1 == 1) {
                cf.year = value;
                // console.log(cf);
            }
            if (i + 1 == 12) {
                cf.operating = value;
                // console.log(cf);
            }
            if (i + 1 == 25) {
                cf.investment = value;
                // console.log(cf);
            }
            if (i + 1 == 35) {
                cf.fundrasing = value;
                // console.log(cf);
            }
            i + 1 == 1 ? console.log(key, value) : void(0); //year
            i + 1 == 12 ? console.log(key, value) : void(0); // operating
            i + 1 == 25 ? console.log(key, value) : void(0); // investment
            i + 1 == 35 ? console.log(key, value) : void(0); // fundrasing
        });

        company.cashflow.push(cf);

        console.log(company)
        var promise = company.save();

        promise.then((doc) => {
            console.log("saved doc", doc);
        }, (err) => {
            if (err.code != 11000) {
                console.log("ERROR on save()", err);
                return;
            }

            // duplicate key error
            // company already existed, insert cashflow into it
            //  if (err.code === 11000) {
            console.log("");
            console.log(company.name, "already existed, insert cashflow into it");
            console.log(company.name, "going to check:", company.cashflow[0].year);

            // find existing company in db
            Company.findOne({
                name: company.name
            }).then((doc) => {

                // if you enable unique in embed field like cashflow.year, the index will affect the whole record
                if (!doc) {
                    // this code wont execute
                    company.save().then((doc) => {
                        console.log("after creation", doc);
                        return;
                    }, (err) => {
                        console.log(err);
                        return;
                    })
                    return;
                }

                // check whether the year is already inserted
                filtered = doc.cashflow.filter((item) => {
                    return item.year === company.cashflow[0].year;
                })

                if (filtered && filtered.length > 0) {
                    console.log(`${doc.name} Cashflow in ${company.cashflow[0].year} already exist.`)
                    return;
                }

                doc.cashflow.push(cf);
                doc.save().then((doc) => {
                    console.log("after push", doc);
                }, (err) => {
                    console.log(err);
                })

            });
        });

        // Company.find({}, function (err, data) {
        //     if (err) {
        //         return console.log(err);
        //     };
        //     console.log("find() callback", data);
        // })
    })


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
    getCompanyName,
    processAssetStatement,
    processIncomeStatement,
    processCashFlow
}