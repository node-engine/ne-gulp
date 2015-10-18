var React = require('react');

var meta = {
    path: "/negulphandlertest",
    title: "negulphandlertest",
    description: "negulphandlertest"
};

var handler = React.createClass({

    render: function() {
        var self = this;

        return (
            <body>
                <h1 id="main-title">negulphandlertest</h1>
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;