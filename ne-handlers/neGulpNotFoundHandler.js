var React = require('react');

var meta = {
    path: "/gulpnotfound",
    title: "Default Not found",
    description: "Route not found"
};

var handler = React.createClass({

    render: function() {
        var self = this;
        return (
            <body>
                <h1 id="main-title">Route not Found</h1>
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;