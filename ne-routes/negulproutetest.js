var neAuto;
if (process.env.NE_AUTO) {
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var express = require(neAuto).express || require('express');

var router = express.Router();

var negulproutetest = function (server){

    router.get('/', function(req, res, next){

        res.send("negulproutetest working")

    });

    server.use('/negulproutetest', router);

};

module.exports = negulproutetest;
