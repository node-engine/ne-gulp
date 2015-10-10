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
            var thisRoute = "React.createElement(Route, { path: '" + meta.path + "', handler: " + handlerName + " }),";
            routesFileRoutesRootRoutes = routesFileRoutesRootRoutes.concat(thisRoute);
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

module.exports = function (dirName, handlersFolder){

    var newDirPath = dirName + "/node_engine/ne-gulp/";

    try {
        stats = fs.lstatSync(newDirPath);
        if (stats.isDirectory()) {
            // Yes it is
            compileRoutes(dirName, handlersFolder);
            compileMeta(dirName, handlersFolder);
        }
    }
    catch (e) {
        fs.mkdir(newDirPath);
        console.log("Creating directory " + newDirPath);
        compileRoutes (dirName, handlersFolder);
        compileMeta (dirName, handlersFolder);
    }

    return undefined

};