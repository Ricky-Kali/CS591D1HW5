var express = require('express');
var router = express.Router();
var user = require('./userData');

/* GET users listing. */
router.get('/', function(req, res, next) {
  user.find({}).then(function (users) {
    res.send(users);
  });
});

module.exports = router;
