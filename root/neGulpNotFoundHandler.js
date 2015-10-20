"use strict";
if (process.env.NE_AUTO) {
    var React = require(process.env.NE_AUTO).react
}
else {
    var React = require("react")
}

var meta = {
    path: "/gulpnotfound",
    title: "Default Not found",
    description: "Route not found"
};

var handler = React.createClass({
    displayName: "handler",

    render: function render() {
        var self = this;
        return React.createElement(
            "body",
            null,
            React.createElement(
                "h1",
                { id: "main-title" },
                "Route not Found"
            )
        );
    }
});

exports.handler = handler;
exports.meta = meta;
