var fs = require('fs');
var path = require('path');

var stringify = require('stringify-object');
//Gulp
var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var del = require('del');
var webpack = require('webpack-stream');
//Stylus
var stylus = require('gulp-stylus');
var rupture = require('rupture');
//PostCSS
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var lost = require('lost');
var rucksack = require('rucksack-css');


//////////////////////
//  compileMeta
//////////////////////

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

            // var requirePath = "../../" + handlersFolder + filename;
            // var requirePath = dirName + "/app/handlers/" + filename;
            var requirePath = dirName + "/" + handlersFolder + filename;

            console.log(' ');
            console.log(' ');
            console.log('neGulp compileMeta: ');
            console.log('requirePath');
            console.log(requirePath);
            console.log(' ');
            console.log(' ');


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

//////////////////////
//  CompileRoutesFile
//////////////////////

function compileRoutesFile (dirName, handlersFolder){

    // Import the dependencies
    var routesFileBase = "'use strict';";
    var routesFileImportVendor = "var React = require('react');var Router = require('react-router');var Route = Router.Route;";
    var routesFileImportRoot = "var Root = require('../../node_engine/ne-gulp/root/root.js');";

    // Import the handlers
    // var IndexHandler = require('./handlers/IndexHandler.js');
    var folderPathForHandlers = dirName + "/" + handlersFolder;
    var routesFileImportHandlers = "";

    // This this needs to be fixed, if will not work in neGulp is not installed in the root of the node_modules folder
    // Maybe compile this to the node_engine folder
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


            // var requirePath = "../../" + handlersFolder + filename;
            // var requirePath = dirName + "/app/handlers/" + filename;

            var requirePath = dirName + "/" + handlersFolder + filename;

            console.log(' ');
            console.log(' ');
            console.log('neGulp compileRoutesFile: ');
            console.log('requirePath');
            console.log(requirePath);
            console.log(' ');
            console.log(' ');


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

//////////////////////
//  compileDataRef
//////////////////////

function compileDataRef (dirName, dataFolder){

    var dataRefFile = "";
    var dataRefFileHead = "var dataRef = [\n";
    var dataRefFileItems = [];

    var folderPath = dirName + "/" + dataFolder;
    fs.readdirSync(folderPath).forEach(function(filename) {

        // var requirePath = "../../" + dataFolder + filename;
        var requirePath = dirName + "/" + dataFolder + filename;

        console.log(' ');
        console.log(' ');
        console.log('neGulp compileDataRef: ');
        console.log('requirePath');
        console.log(requirePath);
        console.log(' ');
        console.log(' ');

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

//////////////////////
//  compileMain
//////////////////////


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

//////////////////////
//  gulpAuto
//////////////////////

var autoHello = function () {

    console.log('            __                                          ');
    console.log('           /..\\___   Hello, You need to check up on me ');
    console.log('          /       \\            I crash your gulp watch ');
    console.log('    _     \\`______/ _                        sometimes ');
    console.log('___/ \\____|_|______/ \\________________________________');
    console.log('   \\ /             \\ /                                ');
    console.log('Sometimes when making changes to files');
    console.log('the watch command crashes, ');
    console.log('just run gulp again to start it up again. ');
};


var autoStatic = function (){

    gulp.src('src/static/**/**/**/*')
        .pipe(gulp.dest('./app/static/'));

    return gulp.watch('src/static/**/**/**/*', [
        'static'
    ]);

};


var autoClear = function () {

    del([
        // 'dist/report.csv',
        // here we use a globbing pattern to match everything inside app folder
        'app/**/*'
    ]);

    del([
        'node_engine/**/*'
    ]);

    return undefined
};


var autoBabel = function () {

    gulp.src('src/**/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/'));

    return gulp.watch('src/**/**/**/*.js', [
        'babel'
    ]);
};


var autoWebpack = function (dirName, options) {

    var requirePath;
    if (options && options.compileFor === "production") {
        requirePath = dirName + "/node_modules/ne-gulp/webpack-production.js";
    }
    else {
        requirePath = dirName + "/node_modules/ne-gulp/webpack.js";
    }

    gulp.src('src/client.js')
        .pipe(webpack(require(requirePath)))
        .pipe(gulp.dest('./app/js/'));

    return undefined
};


var autoStyl = function () {

    gulp.src('src/css/*.css')
        .pipe(gulp.dest('./app/css/'));

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

    return gulp.watch('src/css/*.styl', [
        'style'
    ]);
};


//////////////////////
//  Install Node Engine
//////////////////////

var installNeImports = function () {


    gulp.src('./node_modules/*/ne-imports/*.styl')
        .pipe(gulp.dest('./node_engine/'));

    return undefined

};

var installNeJs = function () {

    gulp.src('./node_modules/*/ne-js/*.js')
        .pipe(gulp.dest('./app/js'));

    return undefined

};

var installNeCSS = function () {

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

var installNeHandlers = function () {

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

var installNeRoot = function () {

    gulp.src('./node_modules/ne-gulp/root/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./node_engine/ne-gulp/root/'));

    return undefined

};

var installNeComponents = function () {

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

var installNeData = function () {

    gulp.src('./node_modules/*/ne-data/*.js')
        .pipe(babel())
        .pipe(rename({
            dirname: "/data"
        }))
        .pipe(gulp.dest('./app'));

    return undefined

};

var installNeStatic = function () {

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

var installNeRoutes = function () {

    gulp.src('./node_modules/*/ne-routes/*')
        .pipe(rename({
            dirname: "/routes"
        }))
        .pipe(gulp.dest('./app'));

    return undefined

};


//////////////////////
//  Short
//////////////////////


var neInstall = function () {

    installNeRoot();
    installNeImports();
    installNeCSS();
    installNeComponents();
    installNeHandlers();
    installNeData();
    installNeStatic();
    installNeRoutes();
    installNeJs()

};

// Install Node Engine
exports.neInstall = neInstall;
exports.installNeRoot = installNeRoot;
exports.installImports = installNeImports;
exports.installNeCSS = installNeCSS;
exports.installNeComponents = installNeComponents;
exports.installNeHandlers = installNeHandlers;
exports.installNeData = installNeData;
exports.installNeStatic = installNeStatic;
exports.installNeRoutes = installNeRoutes;
exports.installNeJs = installNeJs;

// Compile Node Engine
exports.compileMain = compileMain;

// auto
exports.autoStyl = autoStyl;
exports.autoStatic = autoStatic;
exports.autoClear = autoClear;
exports.autoBabel = autoBabel;
exports.autoWebpack = autoWebpack;
exports.autoHello = autoHello;
