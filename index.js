var stringify = require ('stringify-object');
var fs = require('fs');

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


function compileRoutes (dirName, handlersFolder){

    // Import the dependencies
    var routesFileBase = "'use strict';";
    var routesFileImportVendor = "var React = require('react');var Router = require('react-router');var Route = Router.Route;";
    var routesFileImportRoot = "var Root = require('../../app/handlers/aaRoot.js');";

    // Import the handlers
    // var IndexHandler = require('./handlers/IndexHandler.js');
    var folderPathForHandlers = dirName + "/" + handlersFolder;
    var routesFileImportHandlers = "";
    fs.readdirSync(folderPathForHandlers).forEach(function(filename) {

        if (filename === 'aaRoot.js'){

            console.log('');
            console.log('');
            console.log('ne-gulp: filename');
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
    fs.readdirSync(folderPathForRoutes).forEach(function(filename) {

        if (filename === 'aaRoot.js'){

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
    var lastRoute = "React.createElement(Route, { path: '*', handler: NotFoundHandler })";
    routesFileRoutesRootRoutes = routesFileRoutesRootRoutes.concat(lastRoute);
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


function compileDataRef (dirName, apiFolder){

    var dataRefFile = "";
    var dataRefFileHead = "var dataRef = [\n";
    var dataRefFileItems = [];

    var folderPath = dirName + "/" + apiFolder;
    fs.readdirSync(folderPath).forEach(function(filename) {

        var requirePath = "../../" + apiFolder + filename;
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



module.exports = function (dirName){

    var handlersFolder = "app/handlers/";
    var apiFolder = "app/api/";

    var newDirPath = dirName + "/node_engine/ne-gulp/";

    try {
        stats = fs.lstatSync(newDirPath);
        if (stats.isDirectory()) {
            // Yes it is
            compileRoutes(dirName, handlersFolder);
            compileMeta(dirName, handlersFolder);
            compileDataRef (dirName, apiFolder);
        }
    }
    catch (e) {
        fs.mkdir(newDirPath);
        console.log("Creating directory " + newDirPath);
        compileRoutes (dirName, handlersFolder);
        compileMeta (dirName, handlersFolder);
        compileDataRef (dirName, apiFolder)
    }

    return undefined

};