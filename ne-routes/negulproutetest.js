var express = require('express');
var router = express.Router();

var negulproutetest = function (server){

    router.get('/', function(req, res, next){

        res.send("negulproutetest working")

    });

    server.use('/negulproutetest', router);

};

module.exports = negulproutetest;
