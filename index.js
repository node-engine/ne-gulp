var stringify = require ('stringify-object');
var fs = require('fs');
var path = require('path');

//Gulp
var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var del = require('del');
//Stylus
var stylus = require('gulp-stylus');
var rupture = require('rupture');
//PostCSS
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var lost = require('lost');
var rucksack = require('rucksack-css');

function compileMeta (dirName, handlersFolder){

    var appMetaFile = "";
    var appMetaFileHead = "var appmeta = [\n";
    var appMetaFileItems = [];

    var folderPath = dirName + "/" + handlersFolder;
    fs.readdirSync(folderPath).forEach(function(filename) {

        if (filename === 'aaRoot.js'){

            console.log('');
            console.log('');
            console.log("ne-gulp: " + filename + "Skipped on purpose");
            console.log('');
            console.log('');

        }
        else{
            var requirePath = "../../" + handlersFolder + filename;
            var meta = require(requirePath).meta;
            // var metaString = JSON.stringify(meta)

            if(meta){
                var metaString = stringify(meta, {
                    indent: '  ',
                    singleQuotes: false
                });

                console.log('');
                console.log('');
                console.log('ne-gulp: metaString');
                console.log(metaString);
                console.log('');
                console.log('');

                appMetaFileItems.push(metaString);
                //appMetaFileItems = appMetaFileItems.concat(metaString);
            }
            else{
                console.log('');
                console.log('');
                console.log('ERROR');
                console.log('ne-gulp: meta not found for ' + filename);
                console.log(filename);
                console.log('');
                console.log('');
            }
        }
    });
    //appMetaFileItems.splice(0, 1);

    var appMetaFileFoot = "\n]; \nmodule.exports = appmeta;";

    // Compile the appRoutes file
    appMetaFile = appMetaFile.concat(
        appMetaFileHead,
        appMetaFileItems,
        appMetaFileFoot
    );

    console.log('');
    console.log('');
    console.log("ne-gulp: The meta file was compiled!");
    console.log('');
    console.log('');

    var destFilePath = dirName + "/node_engine/ne-gulp/appmeta.js";


    fs.writeFile(destFilePath, appMetaFile, 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('');
        console.log('');
        console.log("ne-gulp: The meta file was saved in " + destFilePath);
        console.log('');
        console.log('');

    });

    return undefined;

}


function compileRoutesFile (dirName, handlersFolder){

    // Import the dependencies
    var routesFileBase = "'use strict';";
    var routesFileImportVendor = "var React = require('react');var Router = require('react-router');var Route = Router.Route;";
    var routesFileImportRoot = "var Root = require('../../node_engine/ne-gulp/root/root.js');";

    // Import the handlers
    // var IndexHandler = require('./handlers/IndexHandler.js');
    var folderPathForHandlers = dirName + "/" + handlersFolder;
    var routesFileImportHandlers = "";

    var notFoundHandlerImport = "var neGulpNotFoundHandler = require('../../node_modules/ne-gulp/root/neGulpNotFoundHandler.js').handler;";
    routesFileImportHandlers = routesFileImportHandlers.concat(notFoundHandlerImport);

    fs.readdirSync(folderPathForHandlers).forEach(function(filename) {

        if (path.extname(filename) === ".css"){

            console.log('');
            console.log('');
            console.log('css');
            console.log('');
            console.log('');

        }
        else if (filename === 'aaRoot.js'){

            console.log('');
            console.log('');
            console.log('ne-gulp: skipped aaRoot.js');
            console.log(filename);
            console.log('');
            console.log('');

        }
        else{

            var handlerName = filename.substr(0,filename.length - 3);
            var requireString = "var " + handlerName + " = require('../../app/handlers/" + handlerName + ".js').handler;";
            routesFileImportHandlers = routesFileImportHandlers.concat(requireString);

        }
    });
    //var lastRouteHandler = "var NotFoundHandler = require('./handlers/NotFoundHandler.js');";
    //routesFileImportHandlers = routesFileImportHandlers.concat(lastRouteHandler);


    // Build the routes object
    var routesFileRoutesHead = "var Routes = React.createElement(";
    var routesFileRoutesRoot = "Route,{ path: '/', handler: Root },";
    var routesFileRoutesRootRoutes = "";
    var folderPathForRoutes = dirName + "/" + handlersFolder;

    var lastRoute = "React.createElement(Route, { path: '*', handler: neGulpNotFoundHandler })";

    fs.readdirSync(folderPathForRoutes).forEach(function(filename) {

        if (filename === 'notFoundHandler.js') {

            lastRoute = "React.createElement(Route, { path: '*', handler: notFoundHandler })";

            console.log('');
            console.log('');
            console.log('ne-gulp: Custom lastRoute ');
            console.log(lastRoute);
            console.log('');
            console.log('');
        }
        else if (filename === 'aaRoot.js'){

            console.log('');
            console.log('');
            console.log('ne-gulp: filename');
            console.log(filename);
            console.log('');
            console.log('');
        }
        else {
            var handlerName = filename.substr(0, filename.length - 3);
            var requirePath = "../../" + handlersFolder + filename;
            var meta = require(requirePath).meta;
            if(meta){
                var thisRoute = "React.createElement(Route, { path: '" + meta.path + "', handler: " + handlerName + " }),";
                routesFileRoutesRootRoutes = routesFileRoutesRootRoutes.concat(thisRoute);
            }
            else{
                console.log('');
                console.log('');
                console.log('ERROR');
                console.log('ne-gulp: meta not found for ' + filename);
                console.log(filename);
                console.log('');
                console.log('');
            }

        }

    });
    var routesFileRouteslastRoute = lastRoute;
    //routesFileRoutesRootRoutes = routesFileRoutesRootRoutes.concat(lastRoute);
    var routesFileRoutesFoot = ");";
    var routesFileExport = "module.exports = Routes;";

    // Compile the appRoutes file
    var routesFile = routesFileBase.concat(
        routesFileImportVendor,
        routesFileImportHandlers,
        routesFileImportRoot,
        routesFileRoutesHead,
        routesFileRoutesRoot,
        routesFileRoutesRootRoutes,
        routesFileRouteslastRoute,
        routesFileRoutesFoot,
        routesFileExport
    );

    console.log('');
    console.log('');
    console.log("ne-gulp: The routes file was compiled!");
    console.log('');
    console.log('');

    var destFilePath = dirName + "/node_engine/ne-gulp/routes.js";

    fs.writeFile(destFilePath, routesFile, 'utf8',  function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('');
        console.log('');
        console.log("ne-gulp: The routes file was saved in " + destFilePath);
        console.log('');
        console.log('');

    });

    return undefined;

}


function compileDataRef (dirName, dataFolder){

    var dataRefFile = "";
    var dataRefFileHead = "var dataRef = [\n";
    var dataRefFileItems = [];

    var folderPath = dirName + "/" + dataFolder;
    fs.readdirSync(folderPath).forEach(function(filename) {

        var requirePath = "../../" + dataFolder + filename;
        var dataRef = require(requirePath).dataRef;
        // var metaString = JSON.stringify(meta)

        if(dataRef){
            var dataRefString = stringify(dataRef, {
                indent: '  ',
                singleQuotes: false
            });

            console.log('');
            console.log('');
            console.log('ne-gulp: dataRefString');
            console.log(dataRefString);
            console.log('');
            console.log('');

            dataRefFileItems.push(dataRefString);
            //dataRefFileItems = dataRefFileItems.concat(dataRefString);
        }
        else{
            console.log('');
            console.log('');
            console.log('ERROR');
            console.log('ne-gulp: dataRef not found for ' + filename);
            console.log(filename);
            console.log('');
            console.log('');
        }

    });
    //dataRefFileItems.splice(0, 1);

    var dataRefFileFoot = "\n]; \nmodule.exports = dataRef;";

    // Compile the appRoutes file
    dataRefFile = dataRefFile.concat(
        dataRefFileHead,
        dataRefFileItems,
        dataRefFileFoot
    );

    console.log('');
    console.log('');
    console.log("ne-gulp: The dataRef file was compiled!");
    console.log('');
    console.log('');

    var destFilePath = dirName + "/node_engine/ne-gulp/dataRef.js";


    fs.writeFile(destFilePath, dataRefFile, 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('');
        console.log('');
        console.log("ne-gulp: The dataRef file was saved in " + destFilePath);
        console.log('');
        console.log('');

    });

    return undefined;

}


var compileMain = function (dirName){

    var handlersFolder = "app/handlers/";
    var dataFolder = "app/data/";

    var newDirPath = dirName + "/node_engine/ne-gulp/";

    try {
        stats = fs.lstatSync(newDirPath);
        if (stats.isDirectory()) {
            // Yes it is
            compileRoutesFile(dirName, handlersFolder);
            compileMeta(dirName, handlersFolder);
            compileDataRef (dirName, dataFolder);
        }
    }
    catch (e) {
        fs.mkdir(newDirPath);
        console.log("Creating directory " + newDirPath);
        compileRoutesFile (dirName, handlersFolder);
        compileMeta (dirName, handlersFolder);
        compileDataRef (dirName, dataFolder)
    }

    return undefined

};

var doImports = function (){

    gulp.src('./node_modules/*/ne-imports/*.styl')
        .pipe(gulp.dest('./node_engine/'));

    return undefined

};


var autoStatic = function (){

    gulp.src('src/static/**/**/**/*')
        .pipe(gulp.dest('./app/static/'));

    return undefined

}


var autoClear = function () {

    del([
        // 'dist/report.csv',
        // here we use a globbing pattern to match everything inside app folder
        'app/**/*'
    ]);

    return undefined
}


var autoBabel = function () {

    gulp.src('src/**/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/'));

    return undefined
}


var compileHandlers = function (){

    gulp.src('./node_modules/*/ne-handlers/*.js')
        .pipe(babel())
        .pipe(rename({
            dirname: "/handlers"
        }))
        .pipe(gulp.dest('./app'));


    //gulp.src('./node_modules/*/ne-handlers/*.js')
    //    .pipe(babel())
    //    .pipe(gulp.dest('./node_engine/'));

    return undefined

};

var compileRoot = function (){

    gulp.src('./node_modules/ne-gulp/root/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./node_engine/ne-gulp/root/'));

    return undefined

};

var compileComponents = function (){

    gulp.src('./node_modules/*/ne-components/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./node_engine/'));

    gulp.src('./node_modules/*/ne-components/*/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./node_engine/'));

    gulp.src('./node_modules/*/ne-components/*/*/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./node_engine/'));

    return undefined

};

var autoStyl = function(){

    gulp.src('src/css/*.styl')
        .pipe(stylus({
            use: [
                rupture()
            ]
        }))
        .pipe(postcss([
            precss({}),
            lost(),
            autoprefixer({}),
            rucksack
            //csswring
        ]))
        .pipe(gulp.dest('./app/css/'));

    return undefined
}

var compileCSS = function (){

    gulp.src('./node_modules/*/ne-css/*.css')
        .pipe(gulp.dest('./app/css/'));

    gulp.src('./node_modules/*/ne-css/*.styl')
        .pipe(stylus({
            use: [
                rupture()
            ]
        }))
        .pipe(postcss([
            precss({}),
            lost(),
            autoprefixer({}),
            rucksack
            //csswring
        ]))
        .pipe(rename({
            dirname: "/css"
        }))
        .pipe(gulp.dest('./app/'));

    return undefined

};

var compileData = function (){

    gulp.src('./node_modules/*/ne-data/*.js')
        .pipe(babel())
        .pipe(rename({
            dirname: "/data"
        }))
        .pipe(gulp.dest('./app'));

    return undefined

};

var compileStatic = function (){

    gulp.src('./node_modules/*/ne-static/*')
        .pipe(rename({
            dirname: "/static"
        }))
        .pipe(gulp.dest('./app'));

    gulp.src('./node_modules/*/ne-static/*/*')
        .pipe(rename({
            dirname: "/static"
        }))
        .pipe(gulp.dest('./app'));

    gulp.src('./node_modules/*/ne-static/*/*/*')
        .pipe(rename({
            dirname: "/static"
        }))
        .pipe(gulp.dest('./app'));

    return undefined

};

var compileRoutes = function (){

    gulp.src('./node_modules/*/ne-routes/*')
        .pipe(rename({
            dirname: "/routes"
        }))
        .pipe(gulp.dest('./app'));

    return undefined

};

var before = function(){
    this.compileRoot();
    this.doImports();
};

var custom = function(){
    this.compileComponents();
    this.compileCSS();
    this.compileData();
    this.compileHandlers();
    this.compileStatic();
    this.compileRoutes();


};


// before
exports.before = before;
exports.compileRoot = compileRoot;
exports.doImports = doImports;

// custom
exports.custom = custom;
exports.compileComponents = compileComponents;
exports.compileCSS = compileCSS;
exports.compileData = compileData;
exports.compileHandlers = compileHandlers;
exports.compileStatic = compileStatic;
exports.compileRoutes = compileRoutes;

// compile
exports.compileMain = compileMain;


// other
exports.autoStyl = autoStyl;
exports.autoStatic = autoStatic;
exports.autoClear = autoClear;
exports.autoBabel = autoBabel;





