if (process.env.NE_AUTO) {
    var mongoose = require(process.env.NE_AUTO).mongoose;
    var neData = require(process.env.NE_AUTO).neData;
}
else {
    var mongoose = require(mongoose);
    var neData = require(neData);
}

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
