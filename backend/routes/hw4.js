var express = require('express');
var request = require('request');
var router = express.Router();

let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=30min&apikey=LDPJHXF0B1VQMUVK';
router.get('/', function(req, res, next) {
    request.get(url, (err, response, body) => {
        if(err){
            return console.log(err);
        }
        let data = JSON.parse(body);
        let meta = data['Meta Data'];
        res.send(meta);
        })
})

module.exports = router;
