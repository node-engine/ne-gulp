"use strict";

var React = require('react');

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
            "html",
            null,
            React.createElement(
                "head",
                null,
                React.createElement(
                    "title",
                    null,
                    this.props.meta.title + this.props.meta.appname
                ),
                React.createElement(
                    "description",
                    {
                        name: "description",
                        content: this.props.meta.description
                    }
                ),
                React.createElement(
                    "head",
                    null
                )
            ),
            React.createElement(
                "body",
                null,
                React.createElement(
                    "h1",
                    { id: "main-title" },
                    "Route not Found"
                )
            )
        );
    }
});

exports.handler = handler;
exports.meta = meta;
