var express = require('express');
var request = require('request');
var router = express.Router();

let func = 'TIME_SERIES_INTRADAY';
let symbol = 'MSFT';
let interval = '30min';
let apikey = 'LDPJHXF0B1VQMUVK';            // Your API key here
let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=30min&apikey=LDPJHXF0B1VQMUVK';
router.get('/', function(req, res, next) {
    request.get(url, (err, response, body) => {
        if(err){
            return console.log(err);
        }
        let reply = JSON.parse(body);
        let metadata = reply['Meta Data'];
        let timeseries = reply['Time Series (30min)'];
        res.render('hw3', {
            title: metadata,
            list: timeseries
        });
    });
});

module.exports = router;
