var neAuto;
if (process.env.NE_AUTO) {
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var mongoose = require(neAuto).mongoose || require(mongoose);
var neData = require(neAuto).neData || require(neData);


var Schema = mongoose.Schema;

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
