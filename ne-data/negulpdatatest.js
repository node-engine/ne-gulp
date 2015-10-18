var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var neData = require('ne-data');

var modelSchema = new Schema({
    testField:{type: String, required: true},
    createdAt:{type: String, required: true, default: new Date()}
});

var dataRef = {
    "name": "negulpdatatest",
    "slug": "/admin/negulpdatatest",
    "apiSlug": "/data/negulpdatatest",
    "fields": [
        {
            name: "p1",
            data: "testField"
        }
    ]
};

var Model = mongoose.model(
    'negulpdatatest',
    modelSchema,
    'negulpdatatest'
);

var routes = function (router, passport, strategyName){

    var permissionsArray = ['reader', 'admin'];

    neData.get(router, Model);
    neData.putWithPermissions(router, Model, permissionsArray);
    neData.postWithPermissions(router, Model, permissionsArray);
    neData.deleteWithPermissions(router, Model, permissionsArray);

};

exports.routes = routes;
exports.dataRef = dataRef;
